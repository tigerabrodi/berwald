// tests/semigroup.test.ts
import {
  allSemigroup,
  anySemigroup,
  arraySemigroup,
  createSemigroup,
  numberAddSemigroup,
  numberMultiplySemigroup,
  stringSemigroup,
} from '../typeclasses/semigroup'

describe('Semigroup', () => {
  test('stringSemigroup concatenates strings', () => {
    expect(stringSemigroup.concat('hello', 'world')).toBe('helloworld')
  })

  test('numberAddSemigroup adds numbers', () => {
    expect(numberAddSemigroup.concat(5, 3)).toBe(8)
  })

  test('numberMultiplySemigroup multiplies numbers', () => {
    expect(numberMultiplySemigroup.concat(5, 3)).toBe(15)
  })

  test('allSemigroup implements logical AND', () => {
    expect(allSemigroup.concat(true, true)).toBe(true)
    expect(allSemigroup.concat(true, false)).toBe(false)
    expect(allSemigroup.concat(false, true)).toBe(false)
    expect(allSemigroup.concat(false, false)).toBe(false)
  })

  test('anySemigroup implements logical OR', () => {
    expect(anySemigroup.concat(true, true)).toBe(true)
    expect(anySemigroup.concat(true, false)).toBe(true)
    expect(anySemigroup.concat(false, true)).toBe(true)
    expect(anySemigroup.concat(false, false)).toBe(false)
  })

  test('arraySemigroup concatenates arrays', () => {
    const semigroup = arraySemigroup<number>()
    expect(semigroup.concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4])
  })

  test('createSemigroup creates custom semigroups', () => {
    // Semigroup that takes the maximum of two numbers
    const maxSemigroup = createSemigroup<number>((x, y) => Math.max(x, y))
    expect(maxSemigroup.concat(5, 10)).toBe(10)
    expect(maxSemigroup.concat(10, 5)).toBe(10)
  })

  test('semigroups satisfy the associative law', () => {
    // Test associativity: concat(concat(a, b), c) === concat(a, concat(b, c))
    const a = 'hello'
    const b = 'functional'
    const c = 'world'

    const result1 = stringSemigroup.concat(stringSemigroup.concat(a, b), c)
    const result2 = stringSemigroup.concat(a, stringSemigroup.concat(b, c))

    expect(result1).toBe(result2)
  })
})
