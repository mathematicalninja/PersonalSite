import type { ElementShape } from '~/types/layout/grid'
import { clampToGrid } from './clampToGrid'

describe('clampToGrid_NEW', () => {
    it('scales up and "floors" integer values correctly', () => {
        const inner: ElementShape = { width: 10, height: 5 }
        const result = clampToGrid({ inner, scaleFactor: 2 })
        expect(result).toEqual({ width: 20, height: 10 })
    })

    it('scales up and floors fractional results', () => {
        const inner: ElementShape = { width: 10, height: 5 }
        const result = clampToGrid({ inner, scaleFactor: 1.5 })
        expect(result).toEqual({ width: 15, height: 7 })
    })

    it('scales down and floors fractional results', () => {
        const inner: ElementShape = { width: 10, height: 5 }
        const result = clampToGrid({ inner, scaleFactor: 0.5 })
        expect(result).toEqual({ width: 5, height: 2 })
    })

    it('returns zeros when scaleFactor is zero', () => {
        const inner: ElementShape = { width: 123, height: 456 }
        const result = clampToGrid({ inner, scaleFactor: 0 })
        expect(result).toEqual({ width: 0, height: 0 })
    })

    it('handles zero dimensions correctly', () => {
        const inner: ElementShape = { width: 0, height: 0 }
        const result = clampToGrid({ inner, scaleFactor: 4 })
        expect(result).toEqual({ width: 0, height: 0 })
    })

    it('handles negative scale factors (floors toward 0)', () => {
        const inner: ElementShape = { width: 10, height: 3 }
        const result = clampToGrid({ inner, scaleFactor: -1.5 })
        expect(result).toEqual({ width: -15, height: -4 })
    })

    it('handles arbitrary fractional values correctly', () => {
        const inner: ElementShape = { width: 2.333, height: 3.333 }
        const result = clampToGrid({ inner, scaleFactor: 3.333 })
        // 2.333 * 3.333 ≈ 7.776, 3.333 * 3.333 ≈ 11.110
        expect(result).toEqual({ width: 7, height: 11 })
    })
})
