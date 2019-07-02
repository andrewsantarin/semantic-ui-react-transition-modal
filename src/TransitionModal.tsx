import PropTypes from 'prop-types';
import React, { Component, Fragment, createRef, isValidElement, cloneElement } from 'react';
import { AutoControlledManager } from 'react-auto-controlled';
import { Modal, ModalProps, StrictTransitionProps, StrictModalProps, Transition } from 'semantic-ui-react';

import { AnyObject, Point2d } from './types';
import { offset, setTransformOrigin, toPxString, safeInvoke } from './utils';


type WrappingTransitionProps = Omit<StrictTransitionProps, 'visible' | 'children' | 'unmountOnHide'>;
type TransitionModalCustomProps = {
  /**
   * Controls whether or not the modal animates starting from the mouse click position when it opens.
   * 
   * **Note:**
   * 
   * 1. This animation will only work when `animation` has been set to `'zoom'`.
   * 2. Setting this prop to `true` will override 
   *
   * @type {boolean}
   * @memberof TransitionModalCustomProps
   */
  zoomFromMousePositionOnOpen?: boolean;
};

export interface TransitionModalProps extends WrappingTransitionProps, StrictModalProps, TransitionModalCustomProps { }
export interface TransitionModalState extends Pick<StrictModalProps, 'open'> { }

// I'm going against the grain of semantic-ui-react by abandoning auto-controlled component superclass inheritance.
// This is deliberate. I'd rather not suffer the mistake of the end user modifying the static `.autoControlledProps`
// of a component class, which could prevent the modal component from closing and opening!
export const transitionModalAutoControlledManager = new AutoControlledManager<TransitionModalState, TransitionModalProps>(
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

export class TransitionModal extends Component<TransitionModalProps & AnyObject, TransitionModalState> {
  // Infer the default props from the subcomponents.
  static defaultProps = {
    ...Transition.defaultProps,
    ...Modal.defaultProps,
  };

  // Infer the prop types from the subcomponents.
  static propTypes = {
    ...Transition.propTypes,
    ...Modal.propTypes,
    zoomFromMousePositionOnOpen: PropTypes.bool, // Unique to this component.
  };

  // Export these components from the original component so that there's no need to import <Modal>.
  static Header = Modal.Header;
  static Content = Modal.Content;
  static Description = Modal.Description;
  static Actions = Modal.Actions;

  static getDerivedStateFromProps = transitionModalAutoControlledManager.getDerivedStateFromProps;

  modal = createRef<Component<ModalProps, any, any>>();
  state = transitionModalAutoControlledManager.getInitialAutoControlledStateFromProps(this.props);

  public trySetState = transitionModalAutoControlledManager.trySetState;

  public applyTransformOriginToModal = (point: Point2d) => () => {
    // Hit the DOM because `.setState()` can't be used. Here are a few reasons:
    //
    // 1. The modal will only mount when this wrapper renders in response to the `.open` state change.
    //    It can't be found in ref before the change. It's needed to find the necessary positionings.
    //
    // 2. Using `getDerivedStateFromProps` is useless because `static` prevents `this` from being used.
    //    The modal still needs to wait after the wrapper has rerender been mounted, anyway.
    //
    // 3. Calling `.setState()` again causes the modal to close itself. I don't know why yet.
    const { animation, zoomFromMousePositionOnOpen } = this.props;
    const isZoom = animation === 'zoom';
    const modal = this.modal.current;

    if (!modal || !(zoomFromMousePositionOnOpen && isZoom)) {
      return;
    }

    const dialog = (modal as any).ref.current;
    const dialogOffset = offset(dialog);
    const transformOrigin = {
      x: point.x - dialogOffset.left,
      y: point.y - dialogOffset.top,
    };

    const transformOriginStr = `${toPxString(transformOrigin.x)} ${toPxString(transformOrigin.y)}`;
    setTransformOrigin(dialog, transformOriginStr);
  }

  private handleOpen: StrictModalProps['onOpen'] = (event) => {
    safeInvoke(this.props.onOpen, event, this.props);
    this.trySetState({
      open: true,
    }, this.applyTransformOriginToModal({
      x: event.clientX,
      y: event.clientY,
    }));
  }

  private handleClose: StrictModalProps['onClose'] = (event) => {
    safeInvoke(this.props.onClose, event, this.props);
    this.trySetState({
      open: false,
    });
  }

  render() {
    const { open } = this.state;
    const {
      // Ignored / Overridden props
      trigger,                      // Render this outside of the modal.
      onOpen,                       // Use class implementation.
      onClose,                      // Use class implementation.
      unmountOnHide,                // Always `true`.
      open: _open,                  // Use class state.
      visible: _visible,            // Use class state.
      zoomFromMousePositionOnOpen,  // For styling.

      // #region Transition component props
      animation, directional, duration, mountOnShow,
      onComplete, onHide, onShow, onStart,
      reactKey, transitionOnMount,
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
            onClick: this.handleOpen, // The trigger element should handle this event.
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
            ref={this.modal}
            onClose={this.handleClose}
            open
          />
        </Transition>
      </Fragment>
    );
  }
}
