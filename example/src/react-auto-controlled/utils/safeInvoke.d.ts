/**
 * Safely invoke the function with the given arguments, if it is indeed a
 * function, and return its value. Otherwise, return undefined.
 */
export declare function safeInvoke<R>(func: (() => R) | undefined): R | undefined;
export declare function safeInvoke<A, R>(func: ((arg1: A) => R) | undefined, arg1: A): R | undefined;
export declare function safeInvoke<A, B, R>(func: ((arg1: A, arg2: B) => R) | undefined, arg1: A, arg2: B): R | undefined;
export declare function safeInvoke<A, B, C, R>(func: ((arg1: A, arg2: B, arg3: C) => R) | undefined, arg1: A, arg2: B, arg3: C): R | undefined;
export declare function safeInvoke<A, B, C, D, R>(func: ((arg1: A, arg2: B, arg3: C, arg4: D) => R) | undefined, arg1: A, arg2: B, arg3: C, arg4: D): R | undefined;
