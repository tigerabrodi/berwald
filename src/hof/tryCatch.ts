import { Either, left, right } from '../core/either'
import { none, Option, some } from '../core/option'

/**
 * Wraps a function that might throw in a try-catch block and returns an Either.
 * Right for success, Left for error.
 *
 * @example
 * const parseJSON = tryCatch(
 *   JSON.parse,
 *   (error) => `Invalid JSON: ${error.message}`
 * );
 *
 * const result = parseJSON('{"name": "Alice"}'); // Right({ name: 'Alice' })
 * const error = parseJSON('invalid'); // Left('Invalid JSON: ...')
 */
export const tryCatch =
  <A, B, E>(f: (...args: Array<A>) => B, onError: (error: unknown) => E) =>
  (...args: Array<A>): Either<E, B> => {
    try {
      return right(f(...args))
    } catch (error) {
      return left(onError(error))
    }
  }

/**
 * Wraps a function that might throw in a try-catch block and returns an Option.
 * Some for success, None for error.
 *
 * @example
 * const parseJSON = tryCatchOption(JSON.parse);
 *
 * const result = parseJSON('{"name": "Alice"}'); // Some({ name: 'Alice' })
 * const error = parseJSON('invalid'); // None
 */
export const tryCatchOption =
  <A, B>(f: (...args: Array<A>) => B) =>
  (...args: Array<A>): Option<B> => {
    try {
      return some(f(...args))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return none
    }
  }

/**
 * Wraps an async function that might throw in a try-catch block and returns a Promise<Either>.
 * Right for success, Left for error.
 *
 * @example
 * const fetchUser = tryCatchAsync(
 *   (id) => fetch(`/users/${id}`).then(res => res.json()),
 *   (error) => `Network error: ${error.message}`
 * );
 *
 * const user = await fetchUser(123); // Either<string, User>
 */
export const tryCatchAsync =
  <A, B, E>(
    f: (...args: Array<A>) => Promise<B>,
    onError: (error: unknown) => E
  ) =>
  async (...args: Array<A>): Promise<Either<E, B>> => {
    try {
      const result = await f(...args)
      return right(result)
    } catch (error) {
      return left(onError(error))
    }
  }

/**
 * Wraps an async function that might throw in a try-catch block and returns a Promise<Option>.
 * Some for success, None for error.
 *
 * @example
 * const fetchUser = tryCatchAsyncOption(
 *   (id) => fetch(`/users/${id}`).then(res => res.json())
 * );
 *
 * const user = await fetchUser(123); // Option<User>
 */
export const tryCatchAsyncOption =
  <A, B>(f: (...args: Array<A>) => Promise<B>) =>
  async (...args: Array<A>): Promise<Option<B>> => {
    try {
      const result = await f(...args)
      return some(result)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return none
    }
  }
