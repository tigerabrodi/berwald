/* eslint-disable @typescript-eslint/no-unused-vars */
import { Equal, Expect } from 'type-testing'
import {
  flatMap,
  fromNullable,
  getOrElse,
  isNone,
  isSome,
  map,
  None,
  none,
  Option,
  Some,
  some,
  tryCatch,
} from '../core/option'

// Runtime tests
describe('Option runtime behavior', () => {
  // Construction tests
  test('some creates a Some with the given value', () => {
    const option = some(42)
    expect(option._tag).toBe('Some')
    expect((option as Some<number>).value).toBe(42)
  })

  test('none creates a None value', () => {
    expect(none._tag).toBe('None')
  })

  // Type guard tests
  test('isSome returns true for Some values', () => {
    expect(isSome(some(42))).toBe(true)
    expect(isSome(none)).toBe(false)
  })

  test('isNone returns true for None values', () => {
    expect(isNone(none)).toBe(true)
    expect(isNone(some(42))).toBe(false)
  })

  // map tests
  test('map transforms the value inside Some', () => {
    const option = some(5)
    const result = map((x: number) => x * 2)(option)

    expect(isSome(result)).toBe(true)
    if (isSome(result)) {
      expect(result.value).toBe(10)
    }
  })

  test('map does not affect None', () => {
    const result = map((x: number) => x * 2)(none)
    expect(isNone(result)).toBe(true)
  })

  // getOrElse tests
  test('getOrElse returns the value for Some', () => {
    const option = some('hello')
    const result = getOrElse('default')(option)
    expect(result).toBe('hello')
  })

  test('getOrElse returns the default value for None', () => {
    const result = getOrElse('default')(none)
    expect(result).toBe('default')
  })

  // flatMap tests
  test('flatMap applies a function that returns an Option', () => {
    const option = some(5)
    const result = flatMap((x: number) => some(x * 2))(option)

    expect(isSome(result)).toBe(true)
    if (isSome(result)) {
      expect(result.value).toBe(10)
    }
  })

  test('flatMap returns None when starting with None', () => {
    const result = flatMap((x: number) => some(x * 2))(none)
    expect(isNone(result)).toBe(true)
  })

  test('flatMap returns None when the function returns None', () => {
    const option = some(5)
    const result = flatMap((_: number) => none)(option)
    expect(isNone(result)).toBe(true)
  })

  // fromNullable tests
  test('fromNullable creates Some for non-null values', () => {
    expect(isSome(fromNullable('test'))).toBe(true)
    expect(isSome(fromNullable(0))).toBe(true)
    expect(isSome(fromNullable(false))).toBe(true)
  })

  test('fromNullable creates None for null or undefined', () => {
    expect(isNone(fromNullable(null))).toBe(true)
    expect(isNone(fromNullable(undefined))).toBe(true)
  })

  // tryCatch tests
  test('tryCatch creates Some when no exception is thrown', () => {
    const result = tryCatch(() => 'success')
    expect(isSome(result)).toBe(true)
    if (isSome(result)) {
      expect(result.value).toBe('success')
    }
  })

  test('tryCatch creates None when an exception is thrown', () => {
    const result = tryCatch(() => {
      throw new Error('fail')
    })
    expect(isNone(result)).toBe(true)
  })
})

// Type tests using type-testing library
describe('Option type behavior', () => {
  // Basic type tests
  test('Option type is correctly defined', () => {
    type test1 = Expect<Equal<Option<number>, Some<number> | None>>
  })

  test('some returns Option<T>', () => {
    const val = some(42)
    type test1 = Expect<Equal<typeof val, Option<number>>>
  })

  test('none is Option<never>', () => {
    type test1 = Expect<Equal<typeof none, Option<never>>>
  })

  // Type guard tests
  test('isSome correctly narrows to Some<T>', () => {
    const val: Option<number> = some(42)
    if (isSome(val)) {
      type test1 = Expect<Equal<typeof val, Some<number>>>
    }
  })

  test('isNone correctly narrows to None', () => {
    const val: Option<number> = none
    if (isNone(val)) {
      type test1 = Expect<Equal<typeof val, None>>
    }
  })

  // Transformation type tests
  test('map preserves the Option wrapper and changes the inner type', () => {
    const val = some(42)
    const mapped = map((n: number) => n.toString())(val)
    type test1 = Expect<Equal<typeof mapped, Option<string>>>
  })

  test('flatMap preserves the Option wrapper and changes the inner type', () => {
    const val = some(42)
    const flatMapped = flatMap((n: number) => some(n.toString()))(val)
    type test1 = Expect<Equal<typeof flatMapped, Option<string>>>
  })

  test('getOrElse returns the inner type', () => {
    const val = some(42)
    const result = getOrElse(0)(val)
    type test1 = Expect<Equal<typeof result, number>>
  })

  // fromNullable type test
  test('fromNullable creates Option from nullable type', () => {
    const val: string | null | undefined = 'hello'
    const option = fromNullable(val)
    type test1 = Expect<Equal<typeof option, Option<string>>>
  })

  // tryCatch type test
  test('tryCatch creates Option from function result type', () => {
    const option = tryCatch(() => 42)
    type test1 = Expect<Equal<typeof option, Option<number>>>
  })
})
