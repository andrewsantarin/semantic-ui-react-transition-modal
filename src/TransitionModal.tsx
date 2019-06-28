import React, { cloneElement, isValidElement, Fragment, createRef, Component, RefObject } from 'react';
import { Transition, Modal, ModalProps, StrictModalProps, StrictTransitionProps } from 'semantic-ui-react';

import { AutoControlledComponent, createAutoControlledComponentStateManagement } from './AutoControlledComponent';
import { safeInvoke } from './utils';


// TODO:
// Figure out whether these functions should be expanded upon.
// #region Shamelessly copied from 'rc-dialog'
function getScroll(w: any, top?: boolean) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`];
  const method = `scroll${top ? 'Top' : 'Left'}`;
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function offset(el: any) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, true);
  return pos;
}

function setTransformOrigin(node: any, value: string) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix: string) => {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}

export const toPxString = function toPxString(value: number) {
  return `${value}px`;
}
// #endregion


// TODO: 
// 1. Figure out which transition props this component won't use.
// 2. Isolate them from everything: defaultProps, propTypes, etc.
// 3. Extract them for assignment to the transition component.
// 4. Zoom from source of click. 


type WrappingTransitionProps = Omit<StrictTransitionProps, 'visible' | 'children' | 'unmountOnHide'>;
type AnyProps = {
  [key: string]: any;
};

export interface TransitionModalState extends Pick<StrictModalProps, 'open'> {}
export interface TransitionModalProps extends WrappingTransitionProps, StrictModalProps {
  /**
   * Controls whether or not the modal animates starting from the mouse click position when it opens.
   * 
   * **Note:** This animation will only work when `animation` has been set to `'zoom'`.
   *
   * @type {boolean}
   * @memberof TransitionModalProps
   */
  zoomFromMousePositionOnOpen?: boolean;
}

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

  modal: RefObject<Component<ModalProps, any, any>> = createRef<Component<ModalProps, any, any>>();

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
    const { clientX, clientY } = event;
    safeInvoke(this.props.onOpen, event, data);
    this.trySetState({
      open: true,
    }, () => {
      // FIXME:
      // I can't use setState here because it rerenders the modal.
      // It would be nice to have this on the state, though.
      const { animation, mousePositionOnOpen } = this.props;
      const isZoom = animation === 'zoom';
      const modal = this.modal.current;

      if (!modal || !(mousePositionOnOpen && isZoom)) {
        return;
      }

      const dialog = (modal as any).ref.current;
      const dialogOffset = offset(dialog);
      const transformOrigin = {
        x: clientX - dialogOffset.left,
        y: clientY - dialogOffset.top,
      };
      setTransformOrigin(dialog, `${toPxString(transformOrigin.x)} ${toPxString(transformOrigin.y)}`);
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
      trigger,                      // Render this outside of the modal.
      onOpen,                       // Use class implementation.
      onClose,                      // Use class implementation.
      unmountOnHide,                // Always `true`.
      open: _open,                  // Use class state.
      visible: _visible,            // Use class state.
      zoomFromMousePositionOnOpen,  // For styling.

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
            ref={this.modal}
            onClose={this.handleClose}
            open
          />
        </Transition>
      </Fragment>
    );
  }
}
