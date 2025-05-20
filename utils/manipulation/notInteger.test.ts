import { notInteger } from './notInteger'

describe('notInteger', () => {
    it('returns false for positive integers', () => {
        expect(notInteger(1)).toBe(false)
        expect(notInteger(42)).toBe(false)
        expect(notInteger(0)).toBe(false)
    })

    it('returns false for negative integers', () => {
        expect(notInteger(-1)).toBe(false)
        expect(notInteger(-100)).toBe(false)
    })

    it('returns true for positive non-integers', () => {
        expect(notInteger(1.5)).toBe(true)
        expect(notInteger(0.1)).toBe(true)
        expect(notInteger(3.1415)).toBe(true)
    })

    it('returns true for negative non-integers', () => {
        expect(notInteger(-2.7)).toBe(true)
        expect(notInteger(-0.01)).toBe(true)
    })

    it('returns false for very large integers', () => {
        expect(notInteger(1e10)).toBe(false)
        expect(notInteger(-1e12)).toBe(false)
    })

    it('returns true for very large non-integers', () => {
        expect(notInteger(1e10 + 0.5)).toBe(true)
        expect(notInteger(-1e12 - 0.1)).toBe(true)
    })

    it('returns true for NaN and Infinity (edge cases)', () => {
        expect(notInteger(NaN)).toBe(true)
        expect(notInteger(Infinity)).toBe(true)
        expect(notInteger(-Infinity)).toBe(true)
    })
})
