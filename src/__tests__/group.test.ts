// tests/group.test.ts
import {
  Group,
  booleanXorGroup,
  createGroup,
  numberAddGroup,
} from '../typeclasses/group'

describe('Group', () => {
  test('numberAddGroup has correct inverse operation', () => {
    expect(numberAddGroup.inverse(5)).toBe(-5)
    expect(numberAddGroup.concat(5, numberAddGroup.inverse(5))).toBe(
      numberAddGroup.empty()
    )
    expect(numberAddGroup.concat(numberAddGroup.inverse(5), 5)).toBe(
      numberAddGroup.empty()
    )
  })

  test('booleanXorGroup has correct inverse operation', () => {
    // With XOR, each element is its own inverse
    expect(booleanXorGroup.inverse(true)).toBe(true)
    expect(booleanXorGroup.inverse(false)).toBe(false)

    expect(booleanXorGroup.concat(true, booleanXorGroup.inverse(true))).toBe(
      booleanXorGroup.empty()
    )
    expect(booleanXorGroup.concat(false, booleanXorGroup.inverse(false))).toBe(
      booleanXorGroup.empty()
    )
  })

  test('createGroup creates custom groups', () => {
    // Group for 2D vector addition
    type Vector2D = [number, number]

    const vector2DGroup: Group<Vector2D> = createGroup<Vector2D>({
      empty: () => [0, 0],
      concat: (x, y) => [x[0] + y[0], x[1] + y[1]],
      inverse: (a) => [-a[0], -a[1]],
    })

    const v1: Vector2D = [3, 4]
    const v2: Vector2D = [-1, 2]

    expect(vector2DGroup.concat(v1, v2)).toEqual([2, 6])
    expect(vector2DGroup.inverse(v1)).toEqual([-3, -4])
    expect(vector2DGroup.concat(v1, vector2DGroup.inverse(v1))).toEqual(
      vector2DGroup.empty()
    )
  })

  test('groups satisfy the group laws', () => {
    const a = 5

    // Identity law: concat(a, empty()) === a
    expect(numberAddGroup.concat(a, numberAddGroup.empty())).toBe(a)

    // Inverse law: concat(a, inverse(a)) === empty()
    expect(numberAddGroup.concat(a, numberAddGroup.inverse(a))).toBe(
      numberAddGroup.empty()
    )

    // Associativity: concat(concat(a, b), c) === concat(a, concat(b, c))
    const b = 10
    const c = 15

    expect(numberAddGroup.concat(numberAddGroup.concat(a, b), c)).toBe(
      numberAddGroup.concat(a, numberAddGroup.concat(b, c))
    )
  })
})
