import { flow, pipe } from '../utils/pipe'

describe('Pipe and Flow', () => {
  // Test simple pipe with one function
  test('pipe with single function works correctly', () => {
    const result = pipe(5, (x) => x * 2)
    expect(result).toBe(10)
  })

  // Test pipe with multiple functions
  test('pipe with multiple functions composes left-to-right', () => {
    const result = pipe(
      5,
      (x) => x * 2,
      (x) => x + 1,
      (x) => String(x)
    )
    expect(result).toBe('11')
  })

  // Test pipe with different types
  test('pipe can change types along the chain', () => {
    const result = pipe(
      'hello',
      (s) => s.length,
      (n) => n * 2,
      (n) => n > 8
    )
    expect(result).toBe(true)
  })

  // Test empty pipe (edge case)
  test('pipe with no functions returns input value', () => {
    const value = { name: 'test' }
    const result = pipe(value)
    expect(result).toBe(value)
  })

  // Test flow with single function
  test('flow with single function works correctly', () => {
    const doubler = flow((x: number) => x * 2)
    expect(doubler(5)).toBe(10)
  })

  // Test flow with multiple functions
  test('flow with multiple functions composes left-to-right', () => {
    const stringifyDoubledPlusOne = flow(
      (x: number) => x * 2,
      (x: number) => x + 1,
      (x: number) => String(x)
    )
    expect(stringifyDoubledPlusOne(5)).toBe('11')
  })

  // Test flow with different types
  test('flow can change types along the chain', () => {
    const stringLengthIsEven = flow(
      (s: string) => s.length,
      (n: number) => n % 2 === 0
    )
    expect(stringLengthIsEven('hello')).toBe(false)
    expect(stringLengthIsEven('world')).toBe(false)
    expect(stringLengthIsEven('typescript')).toBe(true)
  })

  // Test flow with array functions
  test('flow works with array methods', () => {
    const sumOfDoubledOddNumbers = flow(
      (numbers: Array<number>) => numbers.filter((n) => n % 2 === 1),
      (oddNumbers: Array<number>) => oddNumbers.map((n) => n * 2),
      (doubledOddNumbers: Array<number>) =>
        doubledOddNumbers.reduce((sum, n) => sum + n, 0)
    )

    expect(sumOfDoubledOddNumbers([1, 2, 3, 4, 5])).toBe(18) // (1*2) + (3*2) + (5*2) = 18
  })

  // Test combining flow and pipe
  test('flow and pipe can be combined', () => {
    const processString = flow(
      (s: string) => s.toUpperCase(),
      (s: string) => s.split('')
    )

    const result = pipe('hello', processString, (chars) => chars.join('-'))

    expect(result).toBe('H-E-L-L-O')
  })

  // Test empty flow (edge case)
  test('flow with no functions returns identity function', () => {
    const identity = flow()
    const value = { name: 'test' }
    expect(identity(value)).toBe(value)
  })

  // Test reusing functions with flow
  test('flow enables reusable function composition', () => {
    // Define some utility functions
    const double = (n: number) => n * 2
    const increment = (n: number) => n + 1
    const toString = (n: number) => String(n)

    // Create a reusable pipeline
    const processNumber = flow(double, increment, toString)

    // Test with different inputs
    expect(processNumber(5)).toBe('11')
    expect(processNumber(10)).toBe('21')
  })
})
