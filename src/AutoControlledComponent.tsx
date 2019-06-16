/**
 * Why choose inheritance over a HOC?  Multiple advantages for this particular use case.
 * In short, we need identical functionality to setState(), unless there is a prop defined
 * for the state key.  Also:
 *
 * 1. Single Renders
 *    Calling trySetState() in constructor(), componentWillMount(), or componentWillReceiveProps()
 *    does not cause two renders. Consumers and tests do not have to wait two renders to get state.
 *    See www.react.run/4kJFdKoxb/27 for an example of this issue.
 *
 * 2. Simple Testing
 *    Using a HOC means you must either test the undecorated component or test through the decorator.
 *    Testing the undecorated component means you must mock the decorator functionality.
 *    Testing through the HOC means you can not simply shallow render your component.
 *
 * 3. Statics
 *    HOC wrap instances, so statics are no longer accessible.  They can be hoisted, but this is more
 *    looping over properties and storing references.  We rely heavily on statics for testing and sub
 *    components.
 *
 * 4. Instance Methods
 *    Some instance methods may be exposed to users via refs.  Again, these are lost with HOC unless
 *    hoisted and exposed by the HOC.
 */
import { Component, GetDerivedStateFromProps } from 'react';
import { safeInvoke, getAutoControlledStateValue, isFunction } from './utils';
import isUndefined from 'lodash/isUndefined';


// #region Auto-controlled factory of features
/**
 * Creates a set of functions for managing the state of an auto-controlled component.
 *
 * @export
 * @template Props
 * @template State
 * @param {(keyof Partial<Props>)[]} autoControlledProps A list of props to autocontrol.
 * @param {{
 *       getInitialAutoControlledState?: (props: Props) => Partial<State>;
 *       getAutoControlledStateFromProps?: (props: Props, state: State) => Partial<State>;
 *     }} [propToStateDerivers={}] Functions which build the state during component initialization and during state change.
 * @returns {{
 *     getInitialAutoControlledStateFromProps: (props: Props) => Partial<State>;
 *     getDerivedStateFromProps: GetDerivedStateFromProps<Props, State>;
 *   }} The auto-controlled component autonomous state management functions.
 */
export const createAutoControlledComponentStateManagement = function createAutoControlledComponentStateManagement<
  Props extends {
    [key: string]: any;
  },
  State extends Partial<Props>,
  >(
    autoControlledProps: (keyof Partial<Props>)[],
    propToStateDerivers: {
      getInitialAutoControlledState?: (props: Props) => Partial<State>;
      getAutoControlledStateFromProps?: (props: Props, state: State) => Partial<State>;
    } = {}
  ): {
    getInitialAutoControlledStateFromProps: (props: Props) => Partial<State>;
    getDerivedStateFromProps: GetDerivedStateFromProps<Props, State>;
  } {
  const {
    getInitialAutoControlledState,
    getAutoControlledStateFromProps,
  } = propToStateDerivers;

  return {
    getInitialAutoControlledStateFromProps: (props) => {
      const state = safeInvoke(getInitialAutoControlledState, props) || {};

      // Auto controlled props are copied to state.
      // Set initial state by copying auto controlled props to state.
      // Also look for the default prop for any auto controlled props (foo => defaultFoo)
      // so we can set initial values from defaults.
      const initialAutoControlledState = autoControlledProps.reduce<Partial<State>>((acc, prop) => {
        acc[prop] = getAutoControlledStateValue(prop as string, props, state, true);

        return acc;
      }, {});

      return {
        ...state,
        ...initialAutoControlledState,
      };
    },
    getDerivedStateFromProps(nextProps, prevState) {
      // Solve the next state for autoControlledProps
      const newStateFromProps = autoControlledProps.reduce<Partial<State>>((acc, prop) => {
        // if next is defined then use its value
        if (!isUndefined(nextProps[prop])) {
          acc[prop] = nextProps[prop];
        }

        return acc;
      }, {});

      // Due to the inheritance of the AutoControlledComponent we should call its
      // getAutoControlledStateFromProps() and merge it with the existing state
      if (isFunction(getAutoControlledStateFromProps)) {
        const computedState = getAutoControlledStateFromProps(nextProps, {
          ...prevState,
          ...newStateFromProps,
        });

        // We should follow the idea of getDerivedStateFromProps() and return only modified state
        return {
          ...newStateFromProps,
          ...computedState,
        };
      }

      return newStateFromProps;
    },
  };
};
// #endregion


export class AutoControlledComponent<P = {}, S = {}> extends Component<P, S> {
  /**
   * Safely attempt to set state for props that might be controlled by the user.
   * Second argument is a state object that is always passed to setState.
   * @param {object} maybeState State that corresponds to controlled props.
   * @param {object} [state] Actual state, useful when you also need to setState.
   * @param {object} callback Callback which is called after setState applied.
   */
  trySetState = (maybeState: Partial<S>, callback?: () => void) => {
    const newState = Object.keys(maybeState).reduce((acc, prop) => {
      // ignore props defined by the parent
      if (this.props[prop] !== undefined) return acc;

      acc[prop] = maybeState[prop];
      return acc;
    }, {});

    if (Object.keys(newState).length > 0) this.setState(newState, callback);
  }
}
