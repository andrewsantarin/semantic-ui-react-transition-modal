import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AutoControlledManager } from 'react-auto-controlled';
import { ModalProps, StrictTransitionProps, StrictModalProps } from 'semantic-ui-react';
import { AnyObject, Point2d } from './types';
declare type WrappingTransitionProps = Omit<StrictTransitionProps, 'visible' | 'children' | 'unmountOnHide'>;
declare type TransitionModalCustomProps = {
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
export interface TransitionModalProps extends WrappingTransitionProps, StrictModalProps, TransitionModalCustomProps {
}
export interface TransitionModalState extends Pick<StrictModalProps, 'open'> {
}
export declare const transitionModalAutoControlledManager: AutoControlledManager<TransitionModalState, TransitionModalProps>;
export declare class TransitionModal extends Component<TransitionModalProps & AnyObject, TransitionModalState> {
    static defaultProps: {};
    static propTypes: {
        zoomFromMousePositionOnOpen: PropTypes.Requireable<boolean>;
    } | {
        zoomFromMousePositionOnOpen: PropTypes.Requireable<boolean>;
        as?: PropTypes.Validator<any> | undefined;
        actions?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalActionsProps>> | undefined;
        basic?: PropTypes.Validator<boolean | null | undefined> | undefined;
        centered?: PropTypes.Validator<boolean | null | undefined> | undefined;
        children?: PropTypes.Validator<React.ReactNode> | undefined;
        className?: PropTypes.Validator<string | null | undefined> | undefined;
        closeIcon?: PropTypes.Validator<any> | undefined;
        closeOnDimmerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnDocumentClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        content?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalContentProps>> | undefined;
        defaultOpen?: PropTypes.Validator<boolean | null | undefined> | undefined;
        dimmer?: PropTypes.Validator<true | "blurring" | "inverted" | null | undefined> | undefined;
        eventPool?: PropTypes.Validator<string | null | undefined> | undefined;
        header?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalHeaderProps>> | undefined;
        mountNode?: PropTypes.Validator<any> | undefined;
        onActionClick?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onClose?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onMount?: PropTypes.Validator<((nothing: null, data: ModalProps) => void) | null | undefined> | undefined;
        onOpen?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onUnmount?: PropTypes.Validator<((nothing: null, data: ModalProps) => void) | null | undefined> | undefined;
        open?: PropTypes.Validator<boolean | null | undefined> | undefined;
        size?: PropTypes.Validator<"mini" | "tiny" | "small" | "large" | "fullscreen" | null | undefined> | undefined;
        style?: PropTypes.Validator<React.CSSProperties | null | undefined> | undefined;
        trigger?: PropTypes.Validator<React.ReactNode> | undefined;
        closeOnEscape?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnPortalMouseLeave?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerBlur?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerMouseLeave?: PropTypes.Validator<boolean | null | undefined> | undefined;
        mouseEnterDelay?: PropTypes.Validator<number | null | undefined> | undefined;
        mouseLeaveDelay?: PropTypes.Validator<number | null | undefined> | undefined;
        openOnTriggerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        openOnTriggerFocus?: PropTypes.Validator<boolean | null | undefined> | undefined;
        openOnTriggerMouseEnter?: PropTypes.Validator<boolean | null | undefined> | undefined;
        triggerRef?: PropTypes.Validator<((instance: any) => void) | React.RefObject<any> | null | undefined> | undefined;
    } | {
        zoomFromMousePositionOnOpen: PropTypes.Requireable<boolean>;
        animation?: PropTypes.Validator<string | null | undefined> | undefined;
        children?: PropTypes.Validator<React.ReactNode> | undefined;
        directional?: PropTypes.Validator<boolean | null | undefined> | undefined;
        duration?: PropTypes.Validator<string | number | import("semantic-ui-react").TransitionPropDuration | null | undefined> | undefined;
        visible?: PropTypes.Validator<boolean | null | undefined> | undefined;
        mountOnShow?: PropTypes.Validator<boolean | null | undefined> | undefined;
        onComplete?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onHide?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onShow?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onStart?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        reactKey?: PropTypes.Validator<string | null | undefined> | undefined;
        transitionOnMount?: PropTypes.Validator<boolean | null | undefined> | undefined;
        unmountOnHide?: PropTypes.Validator<boolean | null | undefined> | undefined;
    } | {
        zoomFromMousePositionOnOpen: PropTypes.Requireable<boolean>;
        as?: PropTypes.Validator<any> | undefined;
        actions?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalActionsProps>> | undefined;
        basic?: PropTypes.Validator<boolean | null | undefined> | undefined;
        centered?: PropTypes.Validator<boolean | null | undefined> | undefined;
        children?: PropTypes.Validator<React.ReactNode> | undefined;
        className?: PropTypes.Validator<string | null | undefined> | undefined;
        closeIcon?: PropTypes.Validator<any> | undefined;
        closeOnDimmerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnDocumentClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        content?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalContentProps>> | undefined;
        defaultOpen?: PropTypes.Validator<boolean | null | undefined> | undefined;
        dimmer?: PropTypes.Validator<true | "blurring" | "inverted" | null | undefined> | undefined;
        eventPool?: PropTypes.Validator<string | null | undefined> | undefined;
        header?: PropTypes.Validator<import("semantic-ui-react/dist/commonjs/generic").SemanticShorthandItem<import("semantic-ui-react").ModalHeaderProps>> | undefined;
        mountNode?: PropTypes.Validator<any> | undefined;
        onActionClick?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onClose?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onMount?: PropTypes.Validator<((nothing: null, data: ModalProps) => void) | null | undefined> | undefined;
        onOpen?: PropTypes.Validator<((event: React.MouseEvent<HTMLElement, MouseEvent>, data: ModalProps) => void) | null | undefined> | undefined;
        onUnmount?: PropTypes.Validator<((nothing: null, data: ModalProps) => void) | null | undefined> | undefined;
        open?: PropTypes.Validator<boolean | null | undefined> | undefined;
        size?: PropTypes.Validator<"mini" | "tiny" | "small" | "large" | "fullscreen" | null | undefined> | undefined;
        style?: PropTypes.Validator<React.CSSProperties | null | undefined> | undefined;
        trigger?: PropTypes.Validator<React.ReactNode> | undefined;
        closeOnEscape?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnPortalMouseLeave?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerBlur?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        closeOnTriggerMouseLeave?: PropTypes.Validator<boolean | null | undefined> | undefined;
        mouseEnterDelay?: PropTypes.Validator<number | null | undefined> | undefined;
        mouseLeaveDelay?: PropTypes.Validator<number | null | undefined> | undefined;
        openOnTriggerClick?: PropTypes.Validator<boolean | null | undefined> | undefined;
        openOnTriggerFocus?: PropTypes.Validator<boolean | null | undefined> | undefined;
        openOnTriggerMouseEnter?: PropTypes.Validator<boolean | null | undefined> | undefined;
        triggerRef?: PropTypes.Validator<((instance: any) => void) | React.RefObject<any> | null | undefined> | undefined;
        animation?: PropTypes.Validator<string | null | undefined> | undefined;
        directional?: PropTypes.Validator<boolean | null | undefined> | undefined;
        duration?: PropTypes.Validator<string | number | import("semantic-ui-react").TransitionPropDuration | null | undefined> | undefined;
        visible?: PropTypes.Validator<boolean | null | undefined> | undefined;
        mountOnShow?: PropTypes.Validator<boolean | null | undefined> | undefined;
        onComplete?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onHide?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onShow?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        onStart?: PropTypes.Validator<((nothing: null, data: import("semantic-ui-react/dist/commonjs/modules/Transition/Transition").TransitionEventData) => void) | null | undefined> | undefined;
        reactKey?: PropTypes.Validator<string | null | undefined> | undefined;
        transitionOnMount?: PropTypes.Validator<boolean | null | undefined> | undefined;
        unmountOnHide?: PropTypes.Validator<boolean | null | undefined> | undefined;
    };
    static Header: React.FunctionComponent<import("semantic-ui-react").ModalHeaderProps>;
    static Content: React.FunctionComponent<import("semantic-ui-react").ModalContentProps>;
    static Description: React.FunctionComponent<import("semantic-ui-react").ModalDescriptionProps>;
    static Actions: React.ComponentClass<import("semantic-ui-react").ModalActionsProps, any>;
    static getDerivedStateFromProps: React.GetDerivedStateFromProps<TransitionModalProps, TransitionModalState>;
    modal: React.RefObject<React.Component<ModalProps, any, any>>;
    state: TransitionModalState;
    trySetState: (maybeState: Partial<TransitionModalState>, callback?: (() => void) | undefined) => void;
    applyTransformOriginToModal: (point: Point2d) => () => void;
    private handleOpen;
    private handleClose;
    render(): JSX.Element;
}
export {};
