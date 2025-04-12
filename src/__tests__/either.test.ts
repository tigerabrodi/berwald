/* eslint-disable @typescript-eslint/no-unused-vars */
// tests/either.test.ts
import { Equal, Expect } from 'type-testing'
import {
  Either,
  Left,
  Right,
  flatMap,
  getOrElse,
  isLeft,
  isRight,
  left,
  map,
  mapLeft,
  right,
  tryCatch,
} from '../core/either'

// Runtime tests
describe('Either runtime behavior', () => {
  // Construction tests
  test('left creates a Left with the given error value', () => {
    const either = left('error')
    expect(either._tag).toBe('Left')
    expect((either as Left<string>).left).toBe('error')
  })

  test('right creates a Right with the given success value', () => {
    const either = right(42)
    expect(either._tag).toBe('Right')
    expect((either as Right<number>).right).toBe(42)
  })

  // Type guard tests
  test('isLeft returns true for Left values', () => {
    expect(isLeft(left('error'))).toBe(true)
    expect(isLeft(right(42))).toBe(false)
  })

  test('isRight returns true for Right values', () => {
    expect(isRight(right(42))).toBe(true)
    expect(isRight(left('error'))).toBe(false)
  })

  // map tests
  test('map transforms the value inside Right', () => {
    const either = right(5)
    const result = map((x: number) => x * 2)(either)

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toBe(10)
    }
  })

  test('map does not affect Left', () => {
    const either = left('error')
    const result = map((x: number) => x * 2)(either)

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBe('error')
    }
  })

  // mapLeft tests
  test('mapLeft transforms the value inside Left', () => {
    const either = left('error')
    const result = mapLeft((e: string) => e.toUpperCase())(either)

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBe('ERROR')
    }
  })

  test('mapLeft does not affect Right', () => {
    const either = right(42)
    const result = mapLeft((e: string) => e.toUpperCase())(either)

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toBe(42)
    }
  })

  // flatMap tests
  test('flatMap applies a function that returns an Either to Right', () => {
    const either = right(5)
    const result = flatMap((x: number) => right(x * 2))(either)

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toBe(10)
    }
  })

  test('flatMap returns Left when the function returns Left', () => {
    const either = right(5)
    const result = flatMap((_: number) => left('error'))(either)

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBe('error')
    }
  })

  test('flatMap returns the original Left when starting with Left', () => {
    const either = left('original error')
    const result = flatMap((x: number) => right(x * 2))(either)

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBe('original error')
    }
  })

  // getOrElse tests
  test('getOrElse returns the value for Right', () => {
    const either = right('success')
    const result = getOrElse('default')(either)
    expect(result).toBe('success')
  })

  test('getOrElse returns the default value for Left', () => {
    const either = left('error')
    const result = getOrElse('default')(either)
    expect(result).toBe('default')
  })

  // tryCatch tests
  test('tryCatch creates Right when no exception is thrown', () => {
    const result = tryCatch(
      () => 'success',
      (e) => String(e)
    )

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toBe('success')
    }
  })

  test('tryCatch creates Left when an exception is thrown', () => {
    const error = new Error('fail')
    const result = tryCatch(
      () => {
        throw error
      },
      (e) => (e instanceof Error ? e.message : 'unknown error')
    )

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBe('fail')
    }
  })
})

// Type tests
describe('Either type behavior', () => {
  // Basic type tests
  test('Either type is correctly defined', () => {
    type test1 = Expect<
      Equal<Either<string, number>, Left<string> | Right<number>>
    >
  })

  test('left returns Either<E, never>', () => {
    const val = left('error')
    type test1 = Expect<Equal<typeof val, Either<string, never>>>
  })

  test('right returns Either<never, A>', () => {
    const val = right(42)
    type test1 = Expect<Equal<typeof val, Either<never, number>>>
  })

  // Type guard tests
  test('isLeft correctly narrows to Left<E>', () => {
    const val: Either<string, number> = left('error')
    if (isLeft(val)) {
      type test1 = Expect<Equal<typeof val, Left<string>>>
    }
  })

  test('isRight correctly narrows to Right<A>', () => {
    const val: Either<string, number> = right(42)
    if (isRight(val)) {
      type test1 = Expect<Equal<typeof val, Right<number>>>
    }
  })

  test('getOrElse returns the right type', () => {
    const val: Either<string, number> = right(42)
    const result = getOrElse(0)(val)
    type test1 = Expect<Equal<typeof result, number>>
  })

  // tryCatch type test
  test('tryCatch creates Either from function result and error handler', () => {
    const option = tryCatch(
      () => 42,
      (e) => String(e)
    )
    type test1 = Expect<Equal<typeof option, Either<string, number>>>
  })

  // Note: We're skipping type tests for flatMap due to TypeScript's limitations
  // with handling complex generic transformations in higher-order functions.
  // The runtime behavior is still correctly tested.
})
