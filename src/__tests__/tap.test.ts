import { tap } from '../hof/tap'
import { pipe } from '../utils/pipe'

describe('tap', () => {
  test('executes side effect without modifying the value', () => {
    let sideEffect = 0
    const result = tap<number>((x) => {
      sideEffect = x
    })(42)

    expect(result).toBe(42)
    expect(sideEffect).toBe(42)
  })

  test('works in a pipeline', () => {
    let intermediate = 0

    const result = pipe(
      5,
      (x) => x * 2,
      tap((x) => {
        intermediate = x
      }),
      (x) => x + 1
    )

    expect(result).toBe(11)
    expect(intermediate).toBe(10)
  })

  test('multiple taps can be used in sequence', () => {
    const logs: Array<string> = []

    const result = pipe(
      'hello',
      tap((s) => logs.push(`Original: ${s}`)),
      (s) => s.toUpperCase(),
      tap((s) => logs.push(`Uppercase: ${s}`)),
      (s) => s + '!',
      tap((s) => logs.push(`Final: ${s}`))
    )

    expect(result).toBe('HELLO!')
    expect(logs).toEqual([
      'Original: hello',
      'Uppercase: HELLO',
      'Final: HELLO!',
    ])
  })
})
