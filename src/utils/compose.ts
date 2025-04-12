/**
 * Composes functions from right to left.
 *
 * For example:
 *  compose(f, g, h)(x) is equivalent to f(g(h(x)))
 *
 * This is the traditional mathematical function composition.
 */
export function compose<A>(): (a: A) => A
export function compose<A>(a: A): A
export function compose<A, B>(ab: (a: A) => B, a: A): B
export function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C
export function compose<A, B, C, D>(
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => D
export function compose<A, B, C, D, E>(
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => E
export function compose<A, B, C, D, E, F>(
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => F
export function compose<A, B, C, D, E, F, G>(
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => G
export function compose(...fns: Array<(a: unknown) => unknown>): unknown {
  if (fns.length === 0) {
    return (x: unknown) => x
  }

  if (fns.length === 1) {
    return fns[0]
  }

  return fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  )
}

/**
 * Composes functions from right to left and immediately applies them to the input.
 *
 * For example:
 *  composeWith(x, f, g, h) is equivalent to f(g(h(x)))
 */
export function composeWith<A>(a: A): A
export function composeWith<A, B>(a: A, ab: (a: A) => B): B
export function composeWith<A, B, C>(a: A, bc: (b: B) => C, ab: (a: A) => B): C
export function composeWith<A, B, C, D>(
  a: A,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): D
export function composeWith<A, B, C, D, E>(
  a: A,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): E
export function composeWith<A, B, C, D, E, F>(
  a: A,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): F
export function composeWith<A, B, C, D, E, F, G>(
  a: A,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): G
export function composeWith(
  input: unknown,
  ...fns: Array<(a: unknown) => unknown>
): unknown {
  if (fns.length === 0) {
    return input
  }

  return fns.reduceRight((value, fn) => fn(value), input)
}
