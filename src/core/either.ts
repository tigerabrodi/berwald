/**
 * The Either type represents values with two possibilities: Left or Right.
 * By convention, Left is used for failure and Right is used for success.
 */
export type Either<E, A> = Left<E> | Right<A>

/**
 * Represents the failure case (left side)
 */
export interface Left<E> {
  readonly _tag: 'Left'
  readonly left: E
}

/**
 * Represents the success case (right side)
 */
export interface Right<A> {
  readonly _tag: 'Right'
  readonly right: A
}

/**
 * Creates a Left containing the given error value
 */
export const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e,
})

/**
 * Creates a Right containing the given success value
 */
export const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a,
})

/**
 * Returns true if the either is a Left
 */
export const isLeft = <E, A>(either: Either<E, A>): either is Left<E> =>
  either._tag === 'Left'

/**
 * Returns true if the either is a Right
 */
export const isRight = <E, A>(either: Either<E, A>): either is Right<A> =>
  either._tag === 'Right'

/**
 * Maps a function over the right value of an Either
 */
export const map =
  <E, A, B>(f: (a: A) => B) =>
  (either: Either<E, A>): Either<E, B> =>
    isLeft(either) ? either : right(f(either.right))

/**
 * Maps a function over the left value of an Either
 */
export const mapLeft =
  <E, A, G>(f: (e: E) => G) =>
  (either: Either<E, A>): Either<G, A> =>
    isRight(either) ? either : left(f(either.left))

/**
 * Applies a function to the right value if Right, returns the given Either otherwise
 */
export const flatMap =
  <E, A, B, G>(f: (a: A) => Either<G, B>) =>
  (either: Either<E, A>): Either<E | G, B> =>
    isLeft(either) ? either : f(either.right)

/**
 * Returns the right value or a default if Left
 */
export const getOrElse =
  <E, A>(defaultValue: A) =>
  (either: Either<E, A>): A =>
    isLeft(either) ? defaultValue : either.right

/**
 * Creates an Either from a function that might throw
 */
export const tryCatch = <E, A>(
  f: () => A,
  onError: (error: unknown) => E
): Either<E, A> => {
  try {
    return right(f())
  } catch (e) {
    return left(onError(e))
  }
}
