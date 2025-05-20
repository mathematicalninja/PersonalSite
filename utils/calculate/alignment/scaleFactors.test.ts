import { scaleFactors } from './scaleFactors'

describe('clampScaleFactor', () => {
    it('calculates scale factors for perfect fit', () => {
        const result = scaleFactors({
            count: { x: 2, y: 2 },
            outer: { width: 200, height: 100 },
            inner: { width: 50, height: 25 },
        })
        expect(result).toEqual({ x: 2, y: 2 })
    })

    it('returns scale factors less than 1 when inner is larger than outer', () => {
        const result = scaleFactors({
            count: { x: 1, y: 1 },
            outer: { width: 50, height: 50 },
            inner: { width: 100, height: 200 },
        })
        expect(result.x).toBeCloseTo(0.5)
        expect(result.y).toBeCloseTo(0.25)
    })

    it('handles non-square grids', () => {
        const result = scaleFactors({
            count: { x: 3, y: 1 },
            outer: { width: 300, height: 100 },
            inner: { width: 50, height: 100 },
        })
        expect(result).toEqual({ x: 2, y: 1 })
    })

    it('returns 0 if inner width or height is zero', () => {
        const result = scaleFactors({
            count: { x: 2, y: 2 },
            outer: { width: 100, height: 100 },
            inner: { width: 0, height: 0 },
        })
        expect(result.x).toBe(0)
        expect(result.y).toBe(0)
    })

    it('returns 0 if outer width or height is zero', () => {
        const result = scaleFactors({
            count: { x: 2, y: 2 },
            outer: { width: 0, height: 0 },
            inner: { width: 10, height: 10 },
        })
        expect(result.x).toBe(0)
        expect(result.y).toBe(0)
    })
})
