// src/typeclasses/monoid.ts
import { Semigroup } from './semigroup'

/**
 * A Monoid is a Semigroup with an identity element.
 *
 * The identity element must satisfy:
 * concat(empty, a) === a
 * concat(a, empty) === a
 */
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: () => A
}

/**
 * Creates a Monoid instance
 */
export const createMonoid = <A>({
  empty,
  concat,
}: {
  empty: () => A
  concat: (x: A, y: A) => A
}): Monoid<A> => ({
  empty,
  concat,
})

// Common Monoid instances

/**
 * String monoid under concatenation
 */
export const stringMonoid: Monoid<string> = createMonoid({
  empty: () => '',
  concat: (x, y) => x + y,
})

/**
 * Number monoid under addition
 */
export const numberAddMonoid: Monoid<number> = createMonoid({
  empty: () => 0,
  concat: (x, y) => x + y,
})

/**
 * Number monoid under multiplication
 */
export const numberMultiplyMonoid: Monoid<number> = createMonoid({
  empty: () => 1,
  concat: (x, y) => x * y,
})

/**
 * Boolean monoid under conjunction (AND)
 */
export const allMonoid: Monoid<boolean> = createMonoid({
  empty: () => true,
  concat: (x, y) => x && y,
})

/**
 * Boolean monoid under disjunction (OR)
 */
export const anyMonoid: Monoid<boolean> = createMonoid({
  empty: () => false,
  concat: (x, y) => x || y,
})

/**
 * Array monoid under concatenation
 */
export const arrayMonoid = <A>(): Monoid<Array<A>> =>
  createMonoid({
    empty: () => [] as Array<A>,
    concat: (x, y) => [...x, ...y],
  })

/**
 * Combines an array of values using the given monoid
 */
export const concatAll =
  <A>(M: Monoid<A>) =>
  (as: Array<A>): A =>
    as.reduce(M.concat, M.empty())
