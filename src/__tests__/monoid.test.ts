import {
  allMonoid,
  anyMonoid,
  arrayMonoid,
  concatAll,
  createMonoid,
  numberAddMonoid,
  numberMultiplyMonoid,
  stringMonoid,
} from '../typeclasses/monoid'

describe('Monoid', () => {
  test('stringMonoid has empty string as identity', () => {
    expect(stringMonoid.empty()).toBe('')
    expect(stringMonoid.concat(stringMonoid.empty(), 'hello')).toBe('hello')
    expect(stringMonoid.concat('hello', stringMonoid.empty())).toBe('hello')
  })

  test('numberAddMonoid has 0 as identity', () => {
    expect(numberAddMonoid.empty()).toBe(0)
    expect(numberAddMonoid.concat(numberAddMonoid.empty(), 5)).toBe(5)
    expect(numberAddMonoid.concat(5, numberAddMonoid.empty())).toBe(5)
  })

  test('numberMultiplyMonoid has 1 as identity', () => {
    expect(numberMultiplyMonoid.empty()).toBe(1)
    expect(numberMultiplyMonoid.concat(numberMultiplyMonoid.empty(), 5)).toBe(5)
    expect(numberMultiplyMonoid.concat(5, numberMultiplyMonoid.empty())).toBe(5)
  })

  test('allMonoid has true as identity', () => {
    expect(allMonoid.empty()).toBe(true)
    expect(allMonoid.concat(allMonoid.empty(), false)).toBe(false)
    expect(allMonoid.concat(false, allMonoid.empty())).toBe(false)
    expect(allMonoid.concat(allMonoid.empty(), true)).toBe(true)
    expect(allMonoid.concat(true, allMonoid.empty())).toBe(true)
  })

  test('anyMonoid has false as identity', () => {
    expect(anyMonoid.empty()).toBe(false)
    expect(anyMonoid.concat(anyMonoid.empty(), true)).toBe(true)
    expect(anyMonoid.concat(true, anyMonoid.empty())).toBe(true)
    expect(anyMonoid.concat(anyMonoid.empty(), false)).toBe(false)
    expect(anyMonoid.concat(false, anyMonoid.empty())).toBe(false)
  })

  test('arrayMonoid has empty array as identity', () => {
    const monoid = arrayMonoid<number>()
    expect(monoid.empty()).toEqual([])
    expect(monoid.concat(monoid.empty(), [1, 2])).toEqual([1, 2])
    expect(monoid.concat([1, 2], monoid.empty())).toEqual([1, 2])
  })

  test('createMonoid creates custom monoids', () => {
    // Monoid that combines objects by merging their properties
    const objectMergeMonoid = createMonoid<Record<string, unknown>>({
      empty: () => ({}),
      concat: (x, y) => ({ ...x, ...y }),
    })

    expect(objectMergeMonoid.empty()).toEqual({})
    expect(objectMergeMonoid.concat({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 })
    expect(
      objectMergeMonoid.concat(objectMergeMonoid.empty(), { a: 1 })
    ).toEqual({ a: 1 })
  })

  test('concatAll combines an array of values using a monoid', () => {
    expect(concatAll(stringMonoid)([])).toBe('')
    expect(concatAll(stringMonoid)(['a', 'b', 'c'])).toBe('abc')

    expect(concatAll(numberAddMonoid)([])).toBe(0)
    expect(concatAll(numberAddMonoid)([1, 2, 3, 4])).toBe(10)

    expect(concatAll(allMonoid)([])).toBe(true)
    expect(concatAll(allMonoid)([true, true, true])).toBe(true)
    expect(concatAll(allMonoid)([true, false, true])).toBe(false)
  })
})
