/**
 * Curries a function of 2 arguments.
 *
 * Transforms a function: (a, b) => c
 * Into: a => b => c
 */
export function curry2<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => fn(a, b)
}

/**
 * Curries a function of 3 arguments.
 *
 * Transforms a function: (a, b, c) => d
 * Into: a => b => c => d
 */
export function curry3<A, B, C, D>(
  fn: (a: A, b: B, c: C) => D
): (a: A) => (b: B) => (c: C) => D {
  return (a: A) => (b: B) => (c: C) => fn(a, b, c)
}

/**
 * Curries a function of 4 arguments.
 *
 * Transforms a function: (a, b, c, d) => e
 * Into: a => b => c => d => e
 */
export function curry4<A, B, C, D, E>(
  fn: (a: A, b: B, c: C, d: D) => E
): (a: A) => (b: B) => (c: C) => (d: D) => E {
  return (a: A) => (b: B) => (c: C) => (d: D) => fn(a, b, c, d)
}

/**
 * Uncurries a function of 2 arguments.
 *
 * Transforms a function: a => b => c
 * Into: (a, b) => c
 */
export function uncurry2<A, B, C>(
  fn: (a: A) => (b: B) => C
): (a: A, b: B) => C {
  return (a: A, b: B) => fn(a)(b)
}

/**
 * Uncurries a function of 3 arguments.
 *
 * Transforms a function: a => b => c => d
 * Into: (a, b, c) => d
 */
export function uncurry3<A, B, C, D>(
  fn: (a: A) => (b: B) => (c: C) => D
): (a: A, b: B, c: C) => D {
  return (a: A, b: B, c: C) => fn(a)(b)(c)
}

/**
 * Uncurries a function of 4 arguments.
 *
 * Transforms a function: a => b => c => d => e
 * Into: (a, b, c, d) => e
 */
export function uncurry4<A, B, C, D, E>(
  fn: (a: A) => (b: B) => (c: C) => (d: D) => E
): (a: A, b: B, c: C, d: D) => E {
  return (a: A, b: B, c: C, d: D) => fn(a)(b)(c)(d)
}

/**
 * Partially applies a function by providing some of its arguments.
 *
 * The returned function accepts the remaining arguments.
 */
export function partial<A, B, C>(fn: (a: A, b: B) => C, a: A): (b: B) => C {
  return (b: B) => fn(a, b)
}

/**
 * Partially applies a function with 3 arguments by providing the first argument.
 */
export function partial3_1<A, B, C, D>(
  fn: (a: A, b: B, c: C) => D,
  a: A
): (b: B, c: C) => D {
  return (b: B, c: C) => fn(a, b, c)
}

/**
 * Partially applies a function with 3 arguments by providing the first two arguments.
 */
export function partial3_2<A, B, C, D>(
  fn: (a: A, b: B, c: C) => D,
  a: A,
  b: B
): (c: C) => D {
  return (c: C) => fn(a, b, c)
}
