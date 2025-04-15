// Core modules
import * as Either from './core/either'
import * as List from './core/list'
import * as Option from './core/option'
import * as Tuple from './core/tuple'

// Pattern matching
import * as Match from './patterns/match'

// Higher-order functions
import * as Array from './hof/array'
import * as Tap from './hof/tap'
import * as TryCatch from './hof/tryCatch'

// Type classes
import * as Group from './typeclasses/group'
import * as Monoid from './typeclasses/monoid'
import * as Semigroup from './typeclasses/semigroup'

// Utilities
import * as Compose from './utils/compose'
import * as Curry from './utils/curry'
import * as Pipe from './utils/pipe'

// Export all modules as namespaces
export {
  Array,
  // Utilities
  Compose,
  Curry,
  // Core
  Either,
  Group,
  List,
  // Pattern matching
  Match,
  Monoid,
  Option,
  Pipe,
  // Type classes
  Semigroup,
  Tap,
  // Higher-order functions
  TryCatch,
  Tuple,
}
