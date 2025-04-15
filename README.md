# Berwald

Berwald is a functional programming library for TypeScript. I built it for fun and to learn more about functional programming.

## Installation

```bash
# Using npm
npm install @tigerabrodioss/berwald

# Using yarn
yarn add @tigerabrodioss/berwald

# Using pnpm
pnpm add @tigerabrodioss/berwald
```

## Overview

Berwald provides a comprehensive set of tools for functional programming in TypeScript:

- **Core data types**: Option, Either, List, Tuple
- **Pattern matching**: Expressive pattern matching syntax
- **Higher-order functions**: Utilities for working with functions
- **Type classes**: Semigroup, Monoid, Group
- **Utilities**: Pipe, Compose, Curry

All modules are exported as namespaces to prevent name collisions.

## Examples

### Option: Handling nullable values

```typescript
import { Option } from '@tigerabrodioss/berwald'

// Create options
const greeting = Option.some('Hello')
const empty = Option.none

// Transform values safely
const uppercased = Option.map((s: string) => s.toUpperCase())(greeting) // Some('HELLO')

// Handle missing values with a default
const value = Option.getOrElse('Default')(uppercased) // 'HELLO'
const fallback = Option.getOrElse('Default')(empty) // 'Default'
```

### Either: Error handling

```typescript
import { Either, TryCatch } from '@tigerabrodioss/berwald'

// Parse JSON safely
const parseJSON = TryCatch.tryCatch(
  JSON.parse,
  (error: unknown) => `Invalid JSON: ${String(error)}`
)

const result = parseJSON('{"name":"Alice"}') // Right({ name: 'Alice' })
const error = parseJSON('invalid') // Left('Invalid JSON: ...')

// Process result
if (Either.isRight(result)) {
  console.log(result.right.name) // 'Alice'
} else {
  console.error(result.left) // Error message
}
```

### List: Immutable list operations

```typescript
import { List } from '@tigerabrodioss/berwald'

// Create a list
const numbers = List.fromArray([1, 2, 3, 4, 5])

// Transform list contents
const doubled = List.map((n: number) => n * 2)(numbers)
const evens = List.filter((n: number) => n % 2 === 0)(numbers)

// Convert back to array
const result = List.toArray(doubled) // [2, 4, 6, 8, 10]
```

### Pattern Matching

```typescript
import { Match } from '@tigerabrodioss/berwald'

type Shape =
  | { type: 'circle'; radius: number }
  | { type: 'rectangle'; width: number; height: number }
  | { type: 'triangle'; base: number; height: number }

const calculateArea = (shape: Shape) =>
  Match.match(shape)(
    Match.when(
      (s) => s.type === 'circle',
      (s) => Math.PI * (s as { radius: number }).radius ** 2
    ),
    Match.when(
      (s) => s.type === 'rectangle',
      (s) =>
        (s as { width: number; height: number }).width *
        (s as { width: number; height: number }).height
    ),
    Match.when(
      (s) => s.type === 'triangle',
      (s) =>
        ((s as { base: number; height: number }).base *
          (s as { base: number; height: number }).height) /
        2
    )
  )
```

### Function Composition

```typescript
import { Pipe, Compose } from '@tigerabrodioss/berwald'

const add = (a: number) => (b: number) => a + b
const multiply = (a: number) => (b: number) => a * b
const toString = (a: number) => `Result: ${a}`

// Pipe: left-to-right composition
const calculate1 = Pipe.pipe(
  5,
  add(10), // 15
  multiply(2), // 30
  toString // "Result: 30"
)

// Compose: right-to-left composition
const processNumber = Compose.compose(toString, multiply(2), add(10))
const calculate2 = processNumber(5) // "Result: 30"
```

## API Reference

### Core Modules

#### Option

Represents values that may or may not exist.

- `some<A>(value: A): Option<A>` - Creates a Some containing a value
- `none: Option<never>` - Represents no value
- `isSome<A>(option: Option<A>): option is Some<A>` - Type guard for Some
- `isNone<A>(option: Option<A>): option is None` - Type guard for None
- `map<A, B>(f: (a: A) => B): (option: Option<A>) => Option<B>` - Maps the contained value
- `flatMap<A, B>(f: (a: A) => Option<B>): (option: Option<A>) => Option<B>` - Maps and flattens
- `getOrElse<A>(defaultValue: A): (option: Option<A>) => A` - Gets value or returns default

#### Either

Represents a value of one of two possible types (a disjoint union).

- `right<E, A>(value: A): Either<E, A>` - Creates a Right (success) value
- `left<E, A>(value: E): Either<E, A>` - Creates a Left (error) value
- `isRight<E, A>(either: Either<E, A>): either is Right<A>` - Type guard for Right
- `isLeft<E, A>(either: Either<E, A>): either is Left<E>` - Type guard for Left
- `map<E, A, B>(f: (a: A) => B): (either: Either<E, A>) => Either<E, B>` - Maps Right values

#### List

An immutable linked list implementation.

- `nil: List<never>` - The empty list
- `cons<A>(head: A, tail: List<A>): List<A>` - Creates a new list
- `fromArray<A>(arr: ReadonlyArray<A>): List<A>` - Creates a list from an array
- `toArray<A>(list: List<A>): ReadonlyArray<A>` - Converts a list to an array
- `map<A, B>(f: (a: A) => B): (list: List<A>) => List<B>` - Maps over list items

### Pattern Matching

- `match<A>(value: A)` - Starts a pattern match expression
- `when<A, B>(predicate: (a: A) => boolean, transform: (a: A) => B)` - Defines a match pattern
- `otherwise<A, B>(transform: (a: A) => B)` - Default case for when no pattern matches

### Utilities

- `pipe<A, B, ...>(a: A, ab: (a: A) => B, ...): ...` - Pipes a value through functions
- `flow<A, B, ...>(ab: (a: A) => B, ...): (a: A) => ...` - Creates a pipeline function
- `curry<A, B, ...>(f: (a: A, b: B, ...) => R): (a: A) => (b: B) => ... => R` - Curries a function

## License

MIT © Tiger Abrodi
