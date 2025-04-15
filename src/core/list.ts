/**
 * A functional immutable List implementation
 */
export type List<A> = Nil | Cons<A>

/**
 * Represents an empty list
 */
export interface Nil {
  readonly _tag: 'Nil'
}

/**
 * Represents a non-empty list with a head and tail
 */
export interface Cons<A> {
  readonly _tag: 'Cons'
  readonly head: A
  readonly tail: List<A>
}

/**
 * The empty list
 */
export const nil: List<never> = { _tag: 'Nil' }

/**
 * Creates a new list with the given head and tail
 */
export const cons = <A>(head: A, tail: List<A> = nil): List<A> => ({
  _tag: 'Cons',
  head,
  tail,
})

/**
 * Returns true if the list is empty
 */
export const isEmpty = <A>(list: List<A>): list is Nil => list._tag === 'Nil'

/**
 * Returns true if the list is non-empty
 */
export const isNonEmpty = <A>(list: List<A>): list is Cons<A> =>
  list._tag === 'Cons'

/**
 * Gets the head (first element) of the list, or undefined if empty
 */
export const head = <A>(list: List<A>): A | undefined =>
  isEmpty(list) ? undefined : list.head

/**
 * Gets the tail (all but the first element) of the list
 */
export const tail = <A>(list: List<A>): List<A> =>
  isEmpty(list) ? nil : list.tail

/**
 * Creates a list from a JavaScript array
 */
export const fromArray = <A>(arr: ReadonlyArray<A>): List<A> => {
  if (arr.length === 0) return nil
  return cons(arr[0], fromArray(arr.slice(1)))
}

/**
 * Converts a list to a JavaScript array
 */
export const toArray = <A>(list: List<A>): ReadonlyArray<A> => {
  const result: Array<A> = []
  let current: List<A> = list

  while (isNonEmpty(current)) {
    result.push(current.head)
    current = current.tail
  }

  return result
}

/**
 * Maps a function over each element in the list
 */
export const map =
  <A, B>(f: (a: A) => B) =>
  (list: List<A>): List<B> => {
    if (isEmpty(list)) return nil
    return cons(f(list.head), map(f)(list.tail))
  }

/**
 * Filters elements from the list based on a predicate
 */
export const filter =
  <A>(pred: (a: A) => boolean) =>
  (list: List<A>): List<A> => {
    if (isEmpty(list)) return nil

    if (pred(list.head)) {
      return cons(list.head, filter(pred)(list.tail))
    }

    return filter(pred)(list.tail)
  }

/**
 * Reduces the list to a single value using a function
 */
export const reduce =
  <A, B>(f: (acc: B, a: A) => B, initial: B) =>
  (list: List<A>): B => {
    if (isEmpty(list)) return initial
    return reduce(f, f(initial, list.head))(list.tail)
  }

/**
 * Concatenates two lists
 */
export const concat = <A>(list1: List<A>, list2: List<A>): List<A> => {
  if (isEmpty(list1)) return list2
  return cons(list1.head, concat(list1.tail, list2))
}

/**
 * Reverses a list
 */
export const reverse = <A>(list: List<A>): List<A> => {
  const go = (acc: List<A>, current: List<A>): List<A> => {
    if (isEmpty(current)) return acc
    return go(cons(current.head, acc), current.tail)
  }

  return go(nil, list)
}

/**
 * Returns the length of the list
 */
export const length = <A>(list: List<A>): number => {
  let count = 0
  let current = list

  while (isNonEmpty(current)) {
    count++
    current = current.tail
  }

  return count
}

/**
 * Checks if an element exists in the list
 */
export const contains = <A>(
  list: List<A>,
  item: A,
  equals = (a: A, b: A) => a === b
): boolean => {
  if (isEmpty(list)) return false
  if (equals(list.head, item)) return true
  return contains(list.tail, item, equals)
}

/**
 * Returns the first n elements of the list
 */
export const take =
  <A>(n: number) =>
  (list: List<A>): List<A> => {
    if (n <= 0 || isEmpty(list)) return nil
    const next = take<A>(n - 1)(list.tail)
    return cons(list.head, next)
  }

/**
 * Drops the first n elements of the list
 */
export const drop =
  <A>(n: number) =>
  (list: List<A>): List<A> => {
    if (n <= 0 || isEmpty(list)) return list
    return drop<A>(n - 1)(list.tail)
  }

/**
 * Creates a list of sequential integers
 */
export const range = (start: number, end: number): List<number> => {
  if (start > end) return nil
  return cons(start, range(start + 1, end))
}
