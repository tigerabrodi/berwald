/**
 * Executes a function for its side effects and returns the input value.
 * Useful for debugging and logging in function pipelines.
 *
 * @example
 * pipe(
 *   5,
 *   double,
 *   tap(x => console.log(`After doubling: ${x}`)), // logs but passes 10 through
 *   increment
 * ) // => 11
 */
export const tap =
  <T>(f: (value: T) => void) =>
  (value: T): T => {
    f(value)
    return value
  }
