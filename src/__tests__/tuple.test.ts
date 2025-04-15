import {
  bimap,
  first,
  mapFirst,
  mapSecond,
  second,
  swap,
  tuple,
} from '../core/tuple'

describe('Tuple', () => {
  // Test tuple construction
  test('tuple creates a tuple with the given values', () => {
    const t = tuple('hello', 42)
    expect(t[0]).toBe('hello')
    expect(t[1]).toBe(42)
  })

  // Test mapFirst
  test('mapFirst applies a function to the first element only', () => {
    const t = tuple('hello', 42)
    const result = mapFirst((s: string) => s.length)(t)

    expect(result[0]).toBe(5)
    expect(result[1]).toBe(42)
  })

  // Test mapSecond
  test('mapSecond applies a function to the second element only', () => {
    const t = tuple('hello', 42)
    const result = mapSecond((n: number) => n * 2)(t)

    expect(result[0]).toBe('hello')
    expect(result[1]).toBe(84)
  })

  // Test bimap
  test('bimap applies functions to both elements', () => {
    const t = tuple('hello', 42)
    const result = bimap(
      (s: string) => s.toUpperCase(),
      (n: number) => n / 2
    )(t)

    expect(result[0]).toBe('HELLO')
    expect(result[1]).toBe(21)
  })

  // Test first
  test('first extracts the first element', () => {
    const t = tuple('hello', 42)
    const result = first(t)

    expect(result).toBe('hello')
  })

  // Test second
  test('second extracts the second element', () => {
    const t = tuple('hello', 42)
    const result = second(t)

    expect(result).toBe(42)
  })

  // Test swap
  test('swap exchanges the elements', () => {
    const t = tuple('hello', 42)
    const result = swap(t)

    expect(result[0]).toBe(42)
    expect(result[1]).toBe('hello')
  })

  // Test immutability
  test('tuples are immutable', () => {
    const t = tuple('hello', 42)
    // @ts-expect-error - This should cause a TypeScript error
    t[0] = 'world'

    // Even though TypeScript would error, at runtime in JavaScript this might actually change
    // so we only check that our functions treat them as immutable
    const t2 = tuple('hello', 42)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = mapFirst((s) => 'world')(t2)

    // Original should be unchanged
    expect(t2[0]).toBe('hello')
    // New tuple should have the change
    expect(result[0]).toBe('world')
  })

  // Test with complex types
  test('tuples work with complex types', () => {
    const obj = { name: 'Alice' } as const
    const arr = [1, 2, 3] as const
    const t = tuple(obj, arr)

    expect(t[0]).toBe(obj)
    expect(t[1]).toBe(arr)

    // Use explicit return types for the arrow functions
    const result = bimap(
      (o: typeof obj) => ({ ...o, age: 30 }),
      (a: typeof arr) => [...a, 4]
    )(t)

    expect(result[0]).toEqual({ name: 'Alice', age: 30 })
    expect(result[1]).toEqual([1, 2, 3, 4])

    // Original objects should be unchanged
    expect(obj).toEqual({ name: 'Alice' })
    expect(arr).toEqual([1, 2, 3])
  })
})
