import type { ElementShape } from '~/types/layout/grid'
import { gridAlgebra_float } from './gridAlgebra_float'

// -----------------------------------------------------------------------------
// Consts
// -----------------------------------------------------------------------------

const goalN = 4
const r2 = 1.414
const r3 = 1.732
// -----------------------------------------------------------------------------
// Consts for exact fit tests
// -----------------------------------------------------------------------------

const SquareOuter: ElementShape = { width: 100, height: 100 }
const WideOuter: ElementShape = { width: 300, height: 100 }
const TallOuter: ElementShape = { width: 100, height: 300 }

const SquareInner: ElementShape = { width: 50, height: 50 }
const WideInner: ElementShape = { width: 100, height: 50 }
const TallInner: ElementShape = { width: 50, height: 100 }

const LargeInner: ElementShape = { width: 150, height: 150 }

// -----------------------------------------------------------------------------
// Consts for tests of fit involving integer rounding
// -----------------------------------------------------------------------------

const SquareOuter_Nudged: ElementShape = { width: 101, height: 101 }
const WideOuter_Nudged: ElementShape = { width: 301, height: 101 }
const TallOuter_Nudged: ElementShape = { width: 101, height: 301 }

const SquareInner_Nudged: ElementShape = { width: 51, height: 51 }
const WideInner_Nudged: ElementShape = { width: 101, height: 51 }
const TallInner_Nudged: ElementShape = { width: 51, height: 101 }

const LargeInner_Nudged: ElementShape = { width: 151, height: 151 }

// =============================================================================
// Exact fit tests
// =============================================================================

// -----------------------------------------------------------------------------
// Square Outer: x = y
// -----------------------------------------------------------------------------

describe('gridAlgebra_float: trivial', () => {
    test('goalN:1, SquareOuter, WideInner', () => {
        const result = gridAlgebra_float({
            outer: SquareOuter, // 100,  100
            inner: WideInner, // 100, 50
            goalN: 1, // 1
        })
        expect(result.gridCount.x).toBeCloseTo(1 / r2)
        expect(result.gridCount.y).toBeCloseTo(r2)
    })
})
describe('gridAlgebra_float: SquareOuter', () => {
    test('SquareOuter, SquareInner', () => {
        const result = gridAlgebra_float({
            outer: SquareOuter, // 100,  100
            inner: SquareInner, // 50,  50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(2)
        expect(result.gridCount.y).toBeCloseTo(2)
    })

    test('SquareOuter, WideInner', () => {
        const result = gridAlgebra_float({
            outer: SquareOuter, // 100,  100
            inner: WideInner, // 100, 50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r2)
        expect(result.gridCount.y).toBeCloseTo(2 * r2)
    })

    test('SquareOuter,TallInner', () => {
        const result = gridAlgebra_float({
            outer: SquareOuter, // 100,  100
            inner: TallInner, // 50,  100
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(2 * r2)
        expect(result.gridCount.y).toBeCloseTo(r2)
    })

    test('SquareOuter, LargeInner', () => {
        const result = gridAlgebra_float({
            outer: SquareOuter, // 100,  100
            inner: LargeInner, // 150,  150
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBe(2)
        expect(result.gridCount.y).toBe(2)
    })
})

// -----------------------------------------------------------------------------
// Wide Outer: x > y
// -----------------------------------------------------------------------------

describe('gridAlgebra_float: WideOuter', () => {
    test('WideOuter, SquareInner', () => {
        const result = gridAlgebra_float({
            outer: WideOuter, // 300,  100
            inner: SquareInner, // 50,  50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(2 * r3)
        expect(result.gridCount.y).toBeCloseTo(r3 / 1.5)
    })

    test('WideOuter, WideInner', () => {
        const result = gridAlgebra_float({
            outer: WideOuter, // 300,  100
            inner: WideInner, // 100, 50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r2 * r3)
        expect(result.gridCount.y).toBeCloseTo((2 * r2) / r3)
    })

    test('WideOuter, TallInner', () => {
        const result = gridAlgebra_float({
            outer: WideOuter, // 300,  100
            inner: TallInner, // 50,  100
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r3 * r2 * 2)
        expect(result.gridCount.y).toBeCloseTo(r2 / r3)
    })

    test('WideOuter, LargeInner', () => {
        const result = gridAlgebra_float({
            outer: WideOuter, // 300,  100
            inner: LargeInner, // 150,  150
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r3 * 2)
        expect(result.gridCount.y).toBeCloseTo(2 / r3)
    })
})

// -----------------------------------------------------------------------------
// tall Outer: x < y
// -----------------------------------------------------------------------------

describe('gridAlgebra_float: TallOuter', () => {
    test('TallOuter, SquareInner', () => {
        const result = gridAlgebra_float({
            outer: TallOuter, // 100, 300
            inner: SquareInner, // 50,  50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r3 / 1.5)
        expect(result.gridCount.y).toBeCloseTo(2 * r3)
    })

    test('TallOuter, WideInner', () => {
        const result = gridAlgebra_float({
            outer: TallOuter, // 100, 300
            inner: WideInner, // 100, 50
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(r2 / r3)
        expect(result.gridCount.y).toBeCloseTo(2 * r2 * r3)
    })

    test('TallOuter, TallInner', () => {
        const result = gridAlgebra_float({
            outer: TallOuter, // 100, 300
            inner: TallInner, // 50,  100
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo((2 * r2) / r3)
        expect(result.gridCount.y).toBeCloseTo(r3 * r2)
    })

    test('TallOuter, LargeInner', () => {
        const result = gridAlgebra_float({
            outer: TallOuter, // 100, 300
            inner: LargeInner, // 150,  150
            goalN: goalN, // 4
        })
        expect(result.gridCount.x).toBeCloseTo(2 / r3)
        expect(result.gridCount.y).toBeCloseTo(2 * r3)
    })
})
