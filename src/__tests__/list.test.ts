import {
  concat,
  cons,
  contains,
  drop,
  filter,
  fromArray,
  head,
  isEmpty,
  isNonEmpty,
  length,
  map,
  nil,
  range,
  reduce,
  reverse,
  tail,
  take,
  toArray,
} from '../core/list'

describe('List', () => {
  // Test construction
  test('nil creates an empty list', () => {
    expect(isEmpty(nil)).toBe(true)
    expect(isNonEmpty(nil)).toBe(false)
  })

  test('cons creates a non-empty list', () => {
    const list = cons(1, cons(2, nil))
    expect(isEmpty(list)).toBe(false)
    expect(isNonEmpty(list)).toBe(true)
  })

  // Test conversion
  test('fromArray creates a list from an array', () => {
    const arr = [1, 2, 3]
    const list = fromArray(arr)

    expect(isNonEmpty(list)).toBe(true)
    if (isNonEmpty(list)) {
      expect(list.head).toBe(1)
      expect(isNonEmpty(list.tail)).toBe(true)
      if (isNonEmpty(list.tail)) {
        expect(list.tail.head).toBe(2)
      }
    }
  })

  test('toArray converts a list to an array', () => {
    const list = cons(1, cons(2, cons(3, nil)))
    const arr = toArray(list)

    expect(arr).toEqual([1, 2, 3])
  })

  test('round-trip fromArray/toArray preserves content', () => {
    const original = [1, 2, 3, 4, 5]
    const roundTrip = toArray(fromArray(original))

    expect(roundTrip).toEqual(original)
  })

  // Test head and tail
  test('head returns the first element or undefined', () => {
    expect(head(nil)).toBeUndefined()
    expect(head(cons(1, nil))).toBe(1)
    expect(head(cons('a', cons('b', nil)))).toBe('a')
  })

  test('tail returns all but the first element', () => {
    expect(tail(nil)).toBe(nil)

    const list = cons(1, cons(2, cons(3, nil)))
    const tl = tail(list)

    expect(isNonEmpty(tl)).toBe(true)
    if (isNonEmpty(tl)) {
      expect(tl.head).toBe(2)
      expect(isNonEmpty(tl.tail)).toBe(true)
      if (isNonEmpty(tl.tail)) {
        expect(tl.tail.head).toBe(3)
      }
    }
  })

  // Test operations
  test('map transforms each element', () => {
    const list = fromArray([1, 2, 3])
    const doubled = map((x: number) => x * 2)(list)

    expect(toArray(doubled)).toEqual([2, 4, 6])
  })

  test('filter keeps elements that match the predicate', () => {
    const list = fromArray([1, 2, 3, 4, 5])
    const evens = filter((x: number) => x % 2 === 0)(list)

    expect(toArray(evens)).toEqual([2, 4])
  })

  test('reduce combines elements into a single value', () => {
    const list = fromArray([1, 2, 3, 4])
    const sum = reduce((acc: number, x: number) => acc + x, 0)(list)
    const product = reduce((acc: number, x: number) => acc * x, 1)(list)

    expect(sum).toBe(10)
    expect(product).toBe(24)
  })

  test('concat combines two lists', () => {
    const list1 = fromArray([1, 2])
    const list2 = fromArray([3, 4])
    const combined = concat(list1, list2)

    expect(toArray(combined)).toEqual([1, 2, 3, 4])
  })

  test('reverse reverses a list', () => {
    const list = fromArray([1, 2, 3])
    const reversed = reverse(list)

    expect(toArray(reversed)).toEqual([3, 2, 1])
  })

  test('length returns the number of elements', () => {
    expect(length(nil)).toBe(0)
    expect(length(cons(1, nil))).toBe(1)
    expect(length(fromArray([1, 2, 3, 4]))).toBe(4)
  })

  test('contains checks if an element exists', () => {
    const list = fromArray([1, 2, 3])

    expect(contains(list, 2)).toBe(true)
    expect(contains(list, 4)).toBe(false)
  })

  test('take returns the first n elements', () => {
    const list = fromArray([1, 2, 3, 4, 5])

    expect(toArray(take(3)(list))).toEqual([1, 2, 3])
    expect(toArray(take(0)(list))).toEqual([])
    expect(toArray(take(10)(list))).toEqual([1, 2, 3, 4, 5])
  })

  test('drop removes the first n elements', () => {
    const list = fromArray([1, 2, 3, 4, 5])

    expect(toArray(drop(3)(list))).toEqual([4, 5])
    expect(toArray(drop(0)(list))).toEqual([1, 2, 3, 4, 5])
    expect(toArray(drop(10)(list))).toEqual([])
  })

  test('range creates a list of sequential integers', () => {
    expect(toArray(range(1, 5))).toEqual([1, 2, 3, 4, 5])
    expect(toArray(range(5, 1))).toEqual([])
  })

  // Test with custom types
  test('list works with custom types', () => {
    interface Person {
      name: string
      age: number
    }

    const people = fromArray([
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ])

    const names = map((p: Person) => p.name)(people)
    const adults = filter((p: Person) => p.age >= 30)(people)

    expect(toArray(names)).toEqual(['Alice', 'Bob', 'Charlie'])
    expect(toArray(adults).length).toBe(2)
    expect(toArray(adults)[0].name).toBe('Alice')
    expect(toArray(adults)[1].name).toBe('Charlie')
  })

  // Test chaining operations
  test('operations can be chained', () => {
    const list = fromArray([1, 2, 3, 4, 5])

    const result = map((x: number) => x * 2)(
      filter((x: number) => x % 2 === 1)(list)
    )

    expect(toArray(result)).toEqual([2, 6, 10])
  })
})
