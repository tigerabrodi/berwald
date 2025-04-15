import { isLeft, isRight } from '../core/either'
import { isNone, isSome } from '../core/option'
import {
  tryCatch,
  tryCatchAsync,
  tryCatchAsyncOption,
  tryCatchOption,
} from '../hof/tryCatch'

describe('tryCatch utilities', () => {
  test('tryCatch returns Right for successful operations', () => {
    const parseJSON = tryCatch(
      JSON.parse,
      (error: unknown) => `Error: ${String(error)}`
    )

    const result = parseJSON('{"name":"Alice"}')

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toEqual({ name: 'Alice' })
    }
  })

  test('tryCatch returns Left for failed operations', () => {
    const parseJSON = tryCatch(
      JSON.parse,
      (error: unknown) => `Error: ${String(error)}`
    )

    const result = parseJSON('invalid json')

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toContain('Error:')
    }
  })

  test('tryCatchOption returns Some for successful operations', () => {
    const parseJSON = tryCatchOption(JSON.parse)
    const result = parseJSON('{"name":"Alice"}')

    expect(isSome(result)).toBe(true)
    if (isSome(result)) {
      expect(result.value).toEqual({ name: 'Alice' })
    }
  })

  test('tryCatchOption returns None for failed operations', () => {
    const parseJSON = tryCatchOption(JSON.parse)
    const result = parseJSON('invalid json')

    expect(isNone(result)).toBe(true)
  })

  test('tryCatchAsync returns Right for successful operations', async () => {
    const fetchData = tryCatchAsync(
      async () => ({ data: 'success' }),
      (error: unknown) => `Error: ${String(error)}`
    )

    const result = await fetchData()

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right).toEqual({ data: 'success' })
    }
  })

  test('tryCatchAsync returns Left for failed operations', async () => {
    const fetchData = tryCatchAsync(
      async () => {
        throw new Error('Network error')
      },
      (error: unknown) => `Error: ${String(error)}`
    )

    const result = await fetchData()

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toContain('Error: Error: Network error')
    }
  })

  test('tryCatchAsyncOption returns Some for successful operations', async () => {
    const fetchData = tryCatchAsyncOption(async () => ({ data: 'success' }))

    const result = await fetchData()

    expect(isSome(result)).toBe(true)
    if (isSome(result)) {
      expect(result.value).toEqual({ data: 'success' })
    }
  })

  test('tryCatchAsyncOption returns None for failed operations', async () => {
    const fetchData = tryCatchAsyncOption(async () => {
      throw new Error('Network error')
    })

    const result = await fetchData()

    expect(isNone(result)).toBe(true)
  })
})
