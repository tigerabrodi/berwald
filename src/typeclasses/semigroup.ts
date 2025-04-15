// src/typeclasses/semigroup.ts

/**
 * A Semigroup is a type with an associative binary operation.
 *
 * The operation must satisfy the associative law:
 * concat(concat(a, b), c) === concat(a, concat(b, c))
 */
export interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}

/**
 * Creates a Semigroup instance
 */
export const createSemigroup = <A>(
  concat: (x: A, y: A) => A
): Semigroup<A> => ({
  concat,
})

// Common Semigroup instances

/**
 * String semigroup under concatenation
 */
export const stringSemigroup: Semigroup<string> = createSemigroup(
  (x, y) => x + y
)

/**
 * Number semigroup under addition
 */
export const numberAddSemigroup: Semigroup<number> = createSemigroup(
  (x, y) => x + y
)

/**
 * Number semigroup under multiplication
 */
export const numberMultiplySemigroup: Semigroup<number> = createSemigroup(
  (x, y) => x * y
)

/**
 * Boolean semigroup under conjunction (AND)
 */
export const allSemigroup: Semigroup<boolean> = createSemigroup(
  (x, y) => x && y
)

/**
 * Boolean semigroup under disjunction (OR)
 */
export const anySemigroup: Semigroup<boolean> = createSemigroup(
  (x, y) => x || y
)

/**
 * Array semigroup under concatenation
 */
export const arraySemigroup = <A>(): Semigroup<Array<A>> =>
  createSemigroup((x, y) => [...x, ...y])
