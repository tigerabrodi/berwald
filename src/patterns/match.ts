/**
 * Represents a pattern to match against
 */
export interface Pattern<T, R> {
  readonly predicate: (value: T) => boolean
  readonly transform: (value: T) => R
}

/**
 * Creates a pattern that matches when the predicate returns true
 *
 * @example
 * const pattern = when(
 *   (n: number) => n > 0,
 *   (n) => `${n} is positive`
 * );
 */
export const when = <T, R>(
  predicate: (value: T) => boolean,
  transform: (value: T) => R
): Pattern<T, R> => ({
  predicate,
  transform,
})

/**
 * Creates a default pattern that always matches.
 * Used as a fallback in pattern matching.
 *
 * @example
 * match(value)(
 *   // other patterns...
 *   otherwise(() => 'default case')
 * );
 */
export const otherwise = <T, R>(transform: (value: T) => R): Pattern<T, R> =>
  when(() => true, transform)

/**
 * Creates an equality pattern that matches when the value equals the target
 *
 * @example
 * match(value)(
 *   equals(5, () => 'five'),
 *   equals('hello', () => 'greeting')
 * );
 */
export const equals = <T, R>(
  target: T,
  transform: (value: T) => R
): Pattern<T, R> => when((value) => value === target, transform)

/**
 * Creates a type pattern that matches based on a type predicate function
 *
 * @example
 * match(value)(
 *   isType(isString, (s) => `String: ${s}`),
 *   isType(isNumber, (n) => `Number: ${n}`)
 * );
 */
export const isType = <T, S extends T, R>(
  typePredicate: (value: T) => value is S,
  transform: (value: S) => R
): Pattern<T, R> => ({
  predicate: typePredicate,
  transform: transform as (value: T) => R,
})

/**
 * Pattern matches a value against a series of patterns
 *
 * @example
 * const result = match(3)(
 *   when((n) => n > 5, () => 'greater than 5'),
 *   when((n) => n < 0, () => 'negative'),
 *   otherwise(() => 'between 0 and 5')
 * );
 */
export function match<T>(value: T) {
  return <R>(...patterns: Array<Pattern<T, R>>): R => {
    for (const pattern of patterns) {
      if (pattern.predicate(value)) {
        return pattern.transform(value)
      }
    }
    throw new Error('No pattern matched and no fallback provided')
  }
}

// Type guards for common types
export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number'

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === 'boolean'

export const isArray = <T>(value: unknown): value is Array<T> =>
  Array.isArray(value)

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

export const isNull = (value: unknown): value is null => value === null

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined
