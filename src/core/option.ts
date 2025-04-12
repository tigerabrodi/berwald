/**
 * The Option type represents an optional value: every Option is either Some with a value, or None.
 */
export type Option<T> = Some<T> | None

/**
 * Represents the presence of a value
 */
export interface Some<T> {
  readonly _tag: 'Some'
  readonly value: T
}

/**
 * Represents the absence of a value
 */
export interface None {
  readonly _tag: 'None'
}

/**
 * Creates a Some containing the given value
 */
export const some = <T>(value: T): Option<T> => ({ _tag: 'Some', value })

/**
 * Creates a None representing absence of value
 */
export const none: Option<never> = { _tag: 'None' }

/**
 * Returns true if the option is None
 */
export const isNone = <T>(option: Option<T>): option is None =>
  option._tag === 'None'

/**
 * Returns true if the option is Some
 */
export const isSome = <T>(option: Option<T>): option is Some<T> =>
  option._tag === 'Some'

/**
 * Maps a function over the value in an Option
 */
export const map =
  <T, U>(f: (value: T) => U) =>
  (option: Option<T>): Option<U> =>
    isNone(option) ? none : some(f(option.value))

/**
 * Returns the value or a default if None
 */
export const getOrElse =
  <T>(defaultValue: T) =>
  (option: Option<T>): T =>
    isNone(option) ? defaultValue : option.value

/**
 * Applies a function to the value if Some, returns None otherwise
 */
export const flatMap =
  <T, U>(f: (value: T) => Option<U>) =>
  (option: Option<T>): Option<U> =>
    isNone(option) ? none : f(option.value)

/**
 * Creates an Option from a nullable value
 */
export const fromNullable = <T>(value: T | null | undefined): Option<T> =>
  value === null || value === undefined ? none : some(value)

/**
 * Creates an Option from a function that might throw
 */
export const tryCatch = <T>(f: () => T): Option<T> => {
  try {
    return some(f())
  } catch {
    return none
  }
}
