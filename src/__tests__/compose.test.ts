import { compose, composeWith } from '../utils/compose'

describe('Compose', () => {
  // Test simple compose with one function
  test('compose with single function works correctly', () => {
    const double = (x: number) => x * 2
    const doubleFn = compose(double)

    expect(doubleFn(5)).toBe(10)
  })

  // Test compose with multiple functions (right to left)
  test('compose with multiple functions composes right-to-left', () => {
    const double = (x: number) => x * 2
    const increment = (x: number) => x + 1
    const toString = (x: number) => String(x)

    // This reads right-to-left: first double, then increment, then toString
    const stringifyIncrementedDouble = compose(toString, increment, double)

    // 5 → 10 → 11 → "11"
    expect(stringifyIncrementedDouble(5)).toBe('11')
  })

  // Test compose with different types
  test('compose can change types along the chain', () => {
    const getLength = (s: string) => s.length
    const isEven = (n: number) => n % 2 === 0

    const stringLengthIsEven = compose(isEven, getLength)

    expect(stringLengthIsEven('hello')).toBe(false) // length 5 is odd
    expect(stringLengthIsEven('typescript')).toBe(true) // length 10 is even
  })

  // Test empty compose (edge case)
  test('compose with no functions returns identity function', () => {
    const identity = compose()
    const value = { name: 'test' }
    expect(identity(value)).toBe(value)
  })

  // Test comparison between compose and traditional nesting
  test('compose is equivalent to nested function calls', () => {
    const double = (x: number) => x * 2
    const increment = (x: number) => x + 1
    const toString = (x: number) => String(x)

    const composed = compose(toString, increment, double)(5)
    const nested = toString(increment(double(5)))

    expect(composed).toBe(nested)
  })

  // Test composeWith (immediate application)
  test('composeWith applies functions immediately right-to-left', () => {
    const double = (x: number) => x * 2
    const increment = (x: number) => x + 1
    const toString = (x: number) => String(x)

    const result = composeWith(5, toString, increment, double)

    expect(result).toBe('11')
  })

  // Test composeWith with different types
  test('composeWith can change types along the chain', () => {
    const result = composeWith(
      'hello',
      (b: boolean) => (b ? 'yes' : 'no'),
      (n: number) => n > 3,
      (s: string) => s.length
    )

    expect(result).toBe('yes') // "hello" → 5 → true → "yes"
  })

  // Test empty composeWith (edge case)
  test('composeWith with no functions returns input value', () => {
    const value = { name: 'test' }
    const result = composeWith(value)
    expect(result).toBe(value)
  })

  // Test complex example with array operations
  test('compose works with array methods', () => {
    const filterOdd = (nums: Array<number>) => nums.filter((n) => n % 2 === 1)
    const double = (nums: Array<number>) => nums.map((n) => n * 2)
    const sum = (nums: Array<number>) => nums.reduce((acc, n) => acc + n, 0)

    const sumOfDoubledOddNumbers = compose(sum, double, filterOdd)

    expect(sumOfDoubledOddNumbers([1, 2, 3, 4, 5])).toBe(18) // (1*2) + (3*2) + (5*2) = 18
  })

  // Test that order matters (compare with pipe)
  test('compose order is reversed compared to pipe', () => {
    const addA = (s: string) => s + 'A'
    const addB = (s: string) => s + 'B'
    const addC = (s: string) => s + 'C'

    // In compose: right-to-left (C, then B, then A)
    const withCompose = compose(addA, addB, addC)('')

    // Manual nesting (right-to-left)
    const nested = addA(addB(addC('')))

    expect(withCompose).toBe('CBA')
    expect(nested).toBe('CBA')
  })
})
