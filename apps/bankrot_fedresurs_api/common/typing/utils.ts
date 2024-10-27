export type ValueOf<T> = T[keyof T];
// Extract from `T` those keys whose values are assignable to `U`
export type ExtractKey<T, U> = ValueOf<{
  [K in keyof T]: T[K] extends U ? K : never;
}>;
export type AllNames<T> = string & keyof T;
export type PropertyNames<T> = Exclude<AllNames<T>, MethodNames<T>>;
export type MethodNames<T> = string & ExtractKey<T, (...args: any[]) => any>;
