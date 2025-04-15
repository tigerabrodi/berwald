// tests/array.test.ts
import {
  filter,
  flatMap,
  flatten,
  head,
  init,
  last,
  map,
  reduce,
  tail,
} from '../hof/array'
import { pipe } from '../utils/pipe'

describe('Array higher-order functions', () => {
  test('map transforms each element of an array', () => {
    const numbers = [1, 2, 3, 4]
    const doubled = map((x: number) => x * 2)(numbers)

    expect(doubled).toEqual([2, 4, 6, 8])
  })

  test('map provides index as second parameter', () => {
    const letters = ['a', 'b', 'c']
    const withIndices = map((x: string, i: number) => `${x}${i}`)(letters)

    expect(withIndices).toEqual(['a0', 'b1', 'c2'])
  })

  test('filter keeps elements that match the predicate', () => {
    const numbers = [1, 2, 3, 4, 5]
    const evens = filter((x: number) => x % 2 === 0)(numbers)

    expect(evens).toEqual([2, 4])
  })

  test('filter provides index as second parameter', () => {
    const letters = ['a', 'b', 'c', 'd']
    const evenIndices = filter((_: string, i: number) => i % 2 === 0)(letters)

    expect(evenIndices).toEqual(['a', 'c'])
  })

  test('reduce combines elements into a single value', () => {
    const numbers = [1, 2, 3, 4]
    const sum = reduce((acc: number, x: number) => acc + x, 0)(numbers)

    expect(sum).toBe(10)
  })

  test('reduce provides index as third parameter', () => {
    const letters = ['a', 'b', 'c']
    const result = reduce(
      (acc: string, x: string, i: number) => acc + x + i,
      ''
    )(letters)

    expect(result).toBe('a0b1c2')
  })

  test('flatten transforms nested arrays into a single array', () => {
    const nested = [[1, 2], [3, 4], [5]]
    const flat = flatten(nested)

    expect(flat).toEqual([1, 2, 3, 4, 5])
  })

  test('flatMap maps and flattens in one operation', () => {
    const numbers = [1, 2, 3]
    const result = flatMap((x: number) => [x, x * 2])(numbers)

    expect(result).toEqual([1, 2, 2, 4, 3, 6])
  })

  test('head returns the first element', () => {
    expect(head([1, 2, 3])).toBe(1)
    expect(head([])).toBeUndefined()
  })

  test('tail returns all but the first element', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3])
    expect(tail([1])).toEqual([])
    expect(tail([])).toEqual([])
  })

  test('init returns all but the last element', () => {
    expect(init([1, 2, 3])).toEqual([1, 2])
    expect(init([1])).toEqual([])
    expect(init([])).toEqual([])
  })

  test('last returns the last element', () => {
    expect(last([1, 2, 3])).toBe(3)
    expect(last([1])).toBe(1)
    expect(last([])).toBeUndefined()
  })

  test('array functions can be composed in pipelines', () => {
    const numbers = [1, 2, 3, 4, 5]

    const result = pipe(
      numbers,
      filter((x: number) => x % 2 === 1),
      map((x: number) => x * 2),
      reduce((acc: number, x: number) => acc + x, 0)
    )

    expect(result).toBe(18) // (1*2) + (3*2) + (5*2) = 18
  })
})
