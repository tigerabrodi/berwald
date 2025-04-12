/**
 * A tuple of two elements
 */
export type Tuple<A, B> = readonly [A, B]

/**
 * Creates a new tuple
 */
export const tuple = <const A, const B>(a: A, b: B): readonly [A, B] => [a, b]

/**
 * Maps a function over the first element of a tuple
 */
export const mapFirst =
  <A, B, C>(f: (a: A) => C) =>
  ([a, b]: Tuple<A, B>): Tuple<C, B> =>
    [f(a), b] as const

/**
 * Maps a function over the second element of a tuple
 */
export const mapSecond =
  <A, B, C>(f: (b: B) => C) =>
  ([a, b]: Tuple<A, B>): Tuple<A, C> =>
    [a, f(b)] as const

/**
 * Maps functions over both elements of a tuple
 */
export const bimap =
  <const A, const B, C, D>(f: (a: A) => C, g: (b: B) => D) =>
  ([a, b]: Tuple<A, B>): Tuple<C, D> =>
    [f(a), g(b)] as const

/**
 * Extracts the first element of a tuple
 */
export const first = <A, B>([a, _]: Tuple<A, B>): A => a

/**
 * Extracts the second element of a tuple
 */
export const second = <A, B>([_, b]: Tuple<A, B>): B => b

/**
 * Swaps the elements of a tuple
 */
export const swap = <A, B>([a, b]: Tuple<A, B>): Tuple<B, A> => [b, a] as const
