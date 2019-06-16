import React, { cloneElement, isValidElement, Fragment } from 'react';
import { Transition, Modal, StrictModalProps, StrictTransitionProps } from 'semantic-ui-react';


import { AutoControlledComponent, createAutoControlledComponentStateManagement } from './AutoControlledComponent';
import { safeInvoke } from './utils';


// TODO: 
// 1. Figure out which transition props this component won't use.
// 2. Isolate them from everything: defaultProps, propTypes, etc.
// 3. Extract them for assignment to the transition component.


type WrappingTransitionProps = Omit<StrictTransitionProps, 'visible' | 'children'>;
type AnyProps = {
  [key: string]: any;
};

export interface TransitionModalProps extends WrappingTransitionProps, StrictModalProps {}
export interface TransitionModalState extends Pick<StrictModalProps, 'open'> {}

const TransitionModalAutoControlledComponentStateManagement = createAutoControlledComponentStateManagement<TransitionModalProps, TransitionModalState>(
  [
    'open',
  ],
  {
    getInitialAutoControlledState() {
      return {
        open: false,
      };
    },
  }
);

export class TransitionModal extends AutoControlledComponent<AnyProps & TransitionModalProps, TransitionModalState> {
  static defaultProps = Object.assign(
    {},
    Transition.defaultProps,
    Modal.defaultProps
  );

  static propTypes = Object.assign(
    {},
    Transition.propTypes,
    Modal.propTypes
  );

  // Export these components from the original component.
  static Header = Modal.Header;
  static Content = Modal.Content;
  static Description = Modal.Description;
  static Actions = Modal.Actions;

  constructor(props: TransitionModalProps) {
    super(props);

    const state = TransitionModalAutoControlledComponentStateManagement.getInitialAutoControlledStateFromProps(props);

    this.state = state;
  }

  static getDerivedStateFromProps = TransitionModalAutoControlledComponentStateManagement.getDerivedStateFromProps;

  /**
   * Safely attempt to set state for props that might be controlled by the user.
   * Second argument is a state object that is always passed to setState.
   * @param {object} maybeState State that corresponds to controlled props.
   * @param {object} [state] Actual state, useful when you also need to setState.
   * @param {object} callback Callback which is called after setState applied.
   */
  trySetState = (maybeState: Partial<TransitionModalState>, callback?: () => void) => {
    const newState = Object.keys(maybeState).reduce((acc, prop) => {
      // ignore props defined by the parent
      if (this.props[prop] !== undefined) return acc;

      acc[prop] = maybeState[prop];
      return acc;
    }, {});

    if (Object.keys(newState).length === 0) {
      return;
    }

    this.setState(newState, callback);
  }

  private handleOpen: StrictModalProps['onOpen'] = (event, data) => {
    safeInvoke(this.props.onOpen, event, data);
    this.trySetState({
      open: true,
    });
  }

  private handleClose: StrictModalProps['onClose'] = (event, data) => {
    safeInvoke(this.props.onClose, event, data);
    this.trySetState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    const {
      // Ignored / Overridden props
      trigger,            // Render this outside of the modal.
      onOpen,             // Use class implementation.
      onClose,            // Use class implementation.
      unmountOnHide,      // Always `true`.
      open: _open,        // Use class state.
      visible: _visible,  // Use class state.

      // #region Transition component props
      animation,
      directional,
      duration,
      mountOnShow,
      onComplete,
      onHide,
      onShow,
      onStart,
      reactKey,
      transitionOnMount,
      // #endregion

      ...modalProps
    } = this.props;

    const transitionProps: WrappingTransitionProps = {
      animation,
      directional,
      duration,
      mountOnShow,
      onComplete,
      onHide,
      onShow,
      onStart,
      reactKey,
      transitionOnMount,
    };

    // The transition is responsible for toggling the modal's open state.
    // The modal should be considered "open" at all times.
    return (
      <Fragment>
        {trigger != null &&
          isValidElement(trigger) &&
          cloneElement(trigger, {
            onClick: this.handleOpen,
          })
        }
        <Transition
          // Reassign the transition component props back here.
          {...transitionProps}

          // Control these props.
          unmountOnHide
          visible={open}
        >
          <Modal
            {...modalProps}
            onClose={this.handleClose}
            open
          />
        </Transition>
      </Fragment>
    );
  }
}
