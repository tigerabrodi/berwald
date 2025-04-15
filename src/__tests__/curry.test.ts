import {
  curry2,
  curry3,
  curry4,
  partial,
  partial3_1,
  partial3_2,
  uncurry2,
  uncurry3,
  uncurry4,
} from '../utils/curry'

describe('Curry and Uncurry', () => {
  // Test curry2
  test('curry2 transforms a binary function into a curried one', () => {
    const add = (a: number, b: number) => a + b
    const curriedAdd = curry2(add)

    // Full application
    expect(curriedAdd(2)(3)).toBe(5)

    // Partial application
    const add2 = curriedAdd(2)
    expect(add2(3)).toBe(5)
    expect(add2(10)).toBe(12)
  })

  // Test curry3
  test('curry3 transforms a ternary function into a curried one', () => {
    const addThree = (a: number, b: number, c: number) => a + b + c
    const curriedAddThree = curry3(addThree)

    // Full application
    expect(curriedAddThree(1)(2)(3)).toBe(6)

    // Partial application
    const addOneAndMore = curriedAddThree(1)
    const addOneTwoAndMore = addOneAndMore(2)

    expect(addOneTwoAndMore(3)).toBe(6)
    expect(addOneTwoAndMore(10)).toBe(13)
  })

  // Test curry4
  test('curry4 transforms a function with 4 arguments into a curried one', () => {
    const addFour = (a: number, b: number, c: number, d: number) =>
      a + b + c + d
    const curriedAddFour = curry4(addFour)

    // Full application
    expect(curriedAddFour(1)(2)(3)(4)).toBe(10)

    // Partial application at different stages
    const addOneAndMore = curriedAddFour(1)
    const addOneTwoAndMore = addOneAndMore(2)
    const addOneTwoThreeAndMore = addOneTwoAndMore(3)

    expect(addOneTwoThreeAndMore(4)).toBe(10)
    expect(addOneTwoAndMore(3)(7)).toBe(13)
  })

  // Test uncurry2
  test('uncurry2 transforms a curried binary function into a normal one', () => {
    const curriedAdd = (a: number) => (b: number) => a + b
    const add = uncurry2(curriedAdd)

    expect(add(2, 3)).toBe(5)
  })

  // Test uncurry3
  test('uncurry3 transforms a curried ternary function into a normal one', () => {
    const curriedAddThree = (a: number) => (b: number) => (c: number) =>
      a + b + c
    const addThree = uncurry3(curriedAddThree)

    expect(addThree(1, 2, 3)).toBe(6)
  })

  // Test uncurry4
  test('uncurry4 transforms a curried function with 4 arguments into a normal one', () => {
    const curriedAddFour =
      (a: number) => (b: number) => (c: number) => (d: number) =>
        a + b + c + d
    const addFour = uncurry4(curriedAddFour)

    expect(addFour(1, 2, 3, 4)).toBe(10)
  })

  // Test round-trip curry-uncurry
  test('currying and then uncurrying returns equivalent function', () => {
    const original = (a: number, b: number) => a * b
    const curried = curry2(original)
    const uncurried = uncurry2(curried)

    // Should be equivalent to the original
    expect(uncurried(5, 6)).toBe(original(5, 6))
  })

  // Test with different types
  test('curry works with different types', () => {
    const concat = (a: string, b: number) => a + b
    const curriedConcat = curry2(concat)

    expect(curriedConcat('Value: ')(42)).toBe('Value: 42')
  })

  // Test partial application
  test('partial applies the first argument', () => {
    const divide = (a: number, b: number) => a / b
    const divideBy2 = partial(divide, 2)

    expect(divideBy2(10)).toBe(0.2) // 2/10
    expect(divideBy2(5)).toBe(0.4) // 2/5
  })

  // Test partial3_1
  test('partial3_1 applies the first of three arguments', () => {
    const between = (min: number, value: number, max: number) =>
      value >= min && value <= max
    const between0andMax = partial3_1(between, 0)

    expect(between0andMax(5, 10)).toBe(true) // 0 <= 5 <= 10
    expect(between0andMax(-5, 10)).toBe(false) // 0 <= -5 <= 10 (false)
  })

  // Test partial3_2
  test('partial3_2 applies the first two of three arguments', () => {
    const between = (min: number, max: number, value: number) =>
      value >= min && value <= max
    const between0and10 = partial3_2(between, 0, 10)

    expect(between0and10(5)).toBe(true)
    expect(between0and10(15)).toBe(false)
  })

  // Test practical example combining curry and composition
  test('curry can be used in function composition', () => {
    // A function to format numbers as currency
    const formatCurrency = (currency: string, value: number) =>
      `${currency}${value.toFixed(2)}`

    // Curry it to create specific formatters
    const curriedFormat = curry2(formatCurrency)
    const formatUSD = curriedFormat('$')
    const formatEUR = curriedFormat('€')

    expect(formatUSD(123.456)).toBe('$123.46')
    expect(formatEUR(123.456)).toBe('€123.46')
  })

  // Test with more complex types
  test('curry works with complex object types', () => {
    interface User {
      name: string
      age: number
    }

    const formatUser = (prefix: string, user: User) =>
      `${prefix} ${user.name} (${user.age})`

    const curriedFormat = curry2(formatUser)
    const formatEmployee = curriedFormat('Employee:')

    expect(formatEmployee({ name: 'Alice', age: 30 })).toBe(
      'Employee: Alice (30)'
    )
  })
})
