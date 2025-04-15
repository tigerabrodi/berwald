/**
 * A standalone version of Array.map that works with the functional pipeline pattern.
 *
 * @example
 * const numbers = [1, 2, 3];
 * const doubled = map((x: number) => x * 2)(numbers); // [2, 4, 6]
 */
export const map =
  <A, B>(f: (a: A, index: number) => B) =>
  (array: ReadonlyArray<A>): Array<B> =>
    array.map(f)

/**
 * A standalone version of Array.filter that works with the functional pipeline pattern.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const evens = filter((x: number) => x % 2 === 0)(numbers); // [2, 4]
 */
export const filter =
  <A>(predicate: (a: A, index: number) => boolean) =>
  (array: ReadonlyArray<A>): Array<A> =>
    array.filter(predicate)

/**
 * A standalone version of Array.reduce that works with the functional pipeline pattern.
 *
 * @example
 * const numbers = [1, 2, 3, 4];
 * const sum = reduce((acc, x) => acc + x, 0)(numbers); // 10
 */
export const reduce =
  <A, B>(reducer: (accumulator: B, value: A, index: number) => B, initial: B) =>
  (array: ReadonlyArray<A>): B =>
    array.reduce(reducer, initial)

/**
 * Flattens an array of arrays into a single array.
 *
 * @example
 * const nestedArrays = [[1, 2], [3, 4]];
 * const flattened = flatten(nestedArrays); // [1, 2, 3, 4]
 */
export const flatten = <A>(arrays: ReadonlyArray<ReadonlyArray<A>>): Array<A> =>
  ([] as Array<A>).concat(...arrays)

/**
 * Transforms each element in the array and then flattens the result.
 *
 * @example
 * const numbers = [1, 2, 3];
 * const result = flatMap(x => [x, x * 2])(numbers); // [1, 2, 2, 4, 3, 6]
 */
export const flatMap =
  <A, B>(f: (a: A, index: number) => ReadonlyArray<B>) =>
  (array: ReadonlyArray<A>): Array<B> =>
    flatten(map(f)(array))

/**
 * Returns all but the first element of an array.
 */
export const tail = <A>(array: ReadonlyArray<A>): Array<A> => array.slice(1)

/**
 * Returns all but the last element of an array.
 */
export const init = <A>(array: ReadonlyArray<A>): Array<A> => array.slice(0, -1)

/**
 * Returns the first element of an array, or undefined if the array is empty.
 */
export const head = <A>(array: ReadonlyArray<A>): A | undefined => array[0]

/**
 * Returns the last element of an array, or undefined if the array is empty.
 */
export const last = <A>(array: ReadonlyArray<A>): A | undefined =>
  array[array.length - 1]
