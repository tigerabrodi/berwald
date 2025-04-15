// tests/match.test.ts
import {
  equals,
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString,
  isType,
  isUndefined,
  match,
  otherwise,
  when,
} from '../patterns/match'

describe('Pattern Matching', () => {
  // Basic match with when
  test('matches with simple predicates', () => {
    const getValue = (x: number) =>
      match(x)(
        when(
          (n) => n > 10,
          () => 'large'
        ),
        when(
          (n) => n < 0,
          () => 'negative'
        ),
        otherwise(() => 'medium')
      )

    expect(getValue(15)).toBe('large')
    expect(getValue(-5)).toBe('negative')
    expect(getValue(5)).toBe('medium')
  })

  // Using the original value in transform
  test('transforms using the original value', () => {
    const describe = (x: number) =>
      match(x)(
        when(
          (n) => n > 0,
          (n) => `positive ${n}`
        ),
        when(
          (n) => n < 0,
          (n) => `negative ${n}`
        ),
        otherwise((n) => `zero ${n}`)
      )

    expect(describe(5)).toBe('positive 5')
    expect(describe(-5)).toBe('negative -5')
    expect(describe(0)).toBe('zero 0')
  })

  // equals pattern
  test('matches on equality', () => {
    const getDayName = (day: number) =>
      match(day)(
        equals(1, () => 'Monday'),
        equals(2, () => 'Tuesday'),
        equals(3, () => 'Wednesday'),
        otherwise(() => 'Other day')
      )

    expect(getDayName(1)).toBe('Monday')
    expect(getDayName(3)).toBe('Wednesday')
    expect(getDayName(7)).toBe('Other day')
  })

  // isType pattern
  test('matches on type', () => {
    type MixedType = string | number | boolean | null | undefined

    const describe = (value: MixedType) =>
      match(value)(
        isType(isString, (s) => `String: ${s}`),
        isType(isNumber, (n) => `Number: ${n}`),
        isType(isBoolean, (b) => `Boolean: ${b}`),
        isType(isNull, () => 'Null'),
        isType(isUndefined, () => 'Undefined'),
        otherwise(() => 'Unknown type')
      )

    expect(describe('hello')).toBe('String: hello')
    expect(describe(42)).toBe('Number: 42')
    expect(describe(true)).toBe('Boolean: true')
    expect(describe(null)).toBe('Null')
    expect(describe(undefined)).toBe('Undefined')
  })

  // Throwing when no pattern matches
  test('throws when no pattern matches', () => {
    const getValue = (x: number) =>
      match(x)(
        when(
          (n) => n > 10,
          () => 'large'
        ),
        when(
          (n) => n < 0,
          () => 'negative'
        )
        // No otherwise!
      )

    expect(() => getValue(5)).toThrow()
  })

  // Complex object matching
  test('matches on complex objects', () => {
    type User =
      | { type: 'guest'; visitCount: number }
      | { type: 'registered'; name: string; age: number }
      | { type: 'admin'; name: string; permissions: Array<string> }

    const describeUser = (user: User) =>
      match(user)(
        when(
          (u) => u.type === 'guest',
          (u) =>
            `Guest with ${(u as { type: 'guest'; visitCount: number }).visitCount} visits`
        ),
        when(
          (u) => u.type === 'registered' && u.age >= 18,
          (u) =>
            `Adult user: ${(u as { type: 'registered'; name: string }).name}`
        ),
        when(
          (u) => u.type === 'registered',
          (u) =>
            `Minor user: ${(u as { type: 'registered'; name: string }).name}`
        ),
        when(
          (u) => u.type === 'admin',
          (u) =>
            `Admin ${(u as { type: 'admin'; name: string; permissions: Array<string> }).name} with ${(u as { type: 'admin'; permissions: Array<string> }).permissions.length} permissions`
        )
      )

    expect(describeUser({ type: 'guest', visitCount: 3 })).toBe(
      'Guest with 3 visits'
    )

    expect(describeUser({ type: 'registered', name: 'Alice', age: 25 })).toBe(
      'Adult user: Alice'
    )

    expect(describeUser({ type: 'registered', name: 'Bob', age: 16 })).toBe(
      'Minor user: Bob'
    )

    expect(
      describeUser({
        type: 'admin',
        name: 'Charlie',
        permissions: ['read', 'write'],
      })
    ).toBe('Admin Charlie with 2 permissions')
  })

  // Type narrowing with isType
  test('narrows types with isType', () => {
    const process = (value: unknown) =>
      match(value)(
        isType(isArray, (arr) => arr.length), // arr is properly typed as Array<unknown>
        isType(isObject, (obj) => Object.keys(obj).length), // obj is Record<string, unknown>
        isType(isString, (str) => str.length), // str is string
        otherwise(() => 0)
      )

    expect(process(['a', 'b', 'c'])).toBe(3)
    expect(process({ a: 1, b: 2 })).toBe(2)
    expect(process('hello')).toBe(5)
    expect(process(42)).toBe(0)
  })

  // Matching with multiple patterns
  test('evaluates patterns in order', () => {
    const categorize = (n: number) =>
      match(n)(
        when(
          (x) => x > 0 && x < 10,
          () => 'small positive'
        ),
        when(
          (x) => x >= 10 && x < 100,
          () => 'medium positive'
        ),
        when(
          (x) => x >= 100,
          () => 'large positive'
        ),
        when(
          (x) => x < 0 && x > -10,
          () => 'small negative'
        ),
        when(
          (x) => x <= -10 && x > -100,
          () => 'medium negative'
        ),
        when(
          (x) => x <= -100,
          () => 'large negative'
        ),
        otherwise(() => 'zero')
      )

    expect(categorize(5)).toBe('small positive')
    expect(categorize(50)).toBe('medium positive')
    expect(categorize(500)).toBe('large positive')
    expect(categorize(-5)).toBe('small negative')
    expect(categorize(-50)).toBe('medium negative')
    expect(categorize(-500)).toBe('large negative')
    expect(categorize(0)).toBe('zero')
  })
})
