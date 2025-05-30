import type { ElementShape } from '~/types/layout/grid'
import HeightWidthRatio from './HeightWidthRatio'

describe('HeightWidthRatio', () => {
    it('returns correct ratio for positive tall elements', () => {
        const shape: ElementShape = { height: 10, width: 2 }
        expect(HeightWidthRatio(shape)).toBe(5)
    })

    it('returns correct ratio for positive wide elements', () => {
        const shape: ElementShape = { height: 2, width: 10 }
        expect(HeightWidthRatio(shape)).toBe(0.2)
    })

    it('returns 0 if height is 0', () => {
        const shape: ElementShape = { height: 0, width: 5 }
        expect(HeightWidthRatio(shape)).toBe(0)
    })

    it('returns 0 if width is 0', () => {
        const shape: ElementShape = { height: 5, width: 0 }
        expect(HeightWidthRatio(shape)).toBe(0)
    })

    it('returns 0 if both height and width are 0', () => {
        const shape: ElementShape = { height: 0, width: 0 }
        expect(HeightWidthRatio(shape)).toBe(0)
    })

    it('returns correct ratio for floating point values', () => {
        const shape: ElementShape = { height: 7.5, width: 2.5 }
        expect(HeightWidthRatio(shape)).toBe(3)
    })

    it('returns negative ratio if width is negative', () => {
        const shape: ElementShape = { height: 6, width: -2 }
        expect(HeightWidthRatio(shape)).toBe(-3)
    })

    it('returns negative ratio if height is negative', () => {
        const shape: ElementShape = { height: -6, width: 2 }
        expect(HeightWidthRatio(shape)).toBe(-3)
    })

    it('returns positive ratio if both height and width are negative', () => {
        const shape: ElementShape = { height: -6, width: -2 }
        expect(HeightWidthRatio(shape)).toBe(3)
    })
})
