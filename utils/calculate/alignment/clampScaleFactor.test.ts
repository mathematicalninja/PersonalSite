import { clampScaleFactor } from './clampScaleFactor'
import type { ElementShape, ClampDirection, xy } from '~/types/layout/grid'

describe('clampScaleFactor_NEW', () => {
    const outer: ElementShape = { width: 300, height: 120 }
    const inner: ElementShape = { width: 60, height: 30 }
    const gridCount: xy = { x: 2, y: 3 }

    it('calculates scale factor for clamp="x"', () => {
        const result = clampScaleFactor({
            gridCount,
            outer,
            inner,
            clamp: 'x',
        })
        expect(result).toBeCloseTo(2.5)
    })

    it('calculates scale factor for clamp="y"', () => {
        const result = clampScaleFactor({
            gridCount,
            outer,
            inner,
            clamp: 'y',
        })
        expect(result).toBeCloseTo(1.33)
    })

    it('calculates scale factor for clamp="up" (max)', () => {
        const result = clampScaleFactor({
            gridCount,
            outer,
            inner,
            clamp: 'up',
        })
        expect(result).toBeCloseTo(2.5)
    })

    it('calculates scale factor for clamp="down" (min)', () => {
        const result = clampScaleFactor({
            gridCount,
            outer,
            inner,
            clamp: 'down',
        })
        expect(result).toBeCloseTo(1.33)
    })

    it('returns 1 for unknown clamp direction', () => {
        const result = clampScaleFactor({
            gridCount,
            outer,
            inner,
            clamp: 'unknown' as ClampDirection,
        })
        expect(result).toBe(1)
    })

    it('handles non-square grid counts', () => {
        const gridCount2: xy = { x: 5, y: 1 }
        const resultX = clampScaleFactor({
            gridCount: gridCount2,
            outer,
            inner,
            clamp: 'x',
        })
        const resultY = clampScaleFactor({
            gridCount: gridCount2,
            outer,
            inner,
            clamp: 'y',
        })
        expect(resultX).toBeCloseTo(1)
        expect(resultY).toBeCloseTo(4)
    })
})
