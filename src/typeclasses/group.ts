// src/typeclasses/group.ts
import { Monoid } from './monoid'

/**
 * A Group is a Monoid with an inverse operation.
 *
 * The inverse operation must satisfy:
 * concat(a, inverse(a)) === empty()
 * concat(inverse(a), a) === empty()
 */
export interface Group<A> extends Monoid<A> {
  readonly inverse: (a: A) => A
}

/**
 * Creates a Group instance
 */
export const createGroup = <A>({
  empty,
  concat,
  inverse,
}: {
  empty: () => A
  concat: (x: A, y: A) => A
  inverse: (a: A) => A
}): Group<A> => ({
  empty,
  concat,
  inverse,
})

// Common Group instances

/**
 * Number group under addition
 */
export const numberAddGroup: Group<number> = createGroup({
  empty: () => 0,
  concat: (x, y) => x + y,
  inverse: (a) => -a,
})

/**
 * Boolean group under exclusive or (XOR)
 */
export const booleanXorGroup: Group<boolean> = createGroup({
  empty: () => false,
  concat: (x, y) => (x && !y) || (!x && y),
  inverse: (a) => a, // For XOR, each element is its own inverse
})
