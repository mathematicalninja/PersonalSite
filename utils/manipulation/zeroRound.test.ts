import { zeroRound_floor, zeroRound_ceil } from './zeroRound'

describe('zeroRound', () => {
    it('floors positive decimal values', () => {
        expect(zeroRound_floor(3.7)).toBe(3)
        expect(zeroRound_floor(0.9)).toBe(0)
        expect(zeroRound_floor(123456.789)).toBe(123456)
    })

    it('ceilings negative decimal values', () => {
        expect(zeroRound_floor(-2.3)).toBe(-2)
        expect(zeroRound_floor(-0.9)).toBeCloseTo(0) //Note in Jest 0 is not equal to -0
        expect(zeroRound_floor(-98765.4321)).toBe(-98765)
    })

    it('returns the same integer value', () => {
        expect(zeroRound_floor(5)).toBe(5)
        expect(zeroRound_floor(-4)).toBe(-4)
    })

    it('handles zero correctly', () => {
        expect(zeroRound_floor(0)).toBe(0)
    })

    // Tests for zeroRound_ceil
    describe('zeroRound_ceil', () => {
        it('ceilings positive decimal values', () => {
            expect(zeroRound_ceil(3.2)).toBe(4)
            expect(zeroRound_ceil(0.1)).toBe(1)
            expect(zeroRound_ceil(123456.001)).toBe(123457)
        })

        it('floors negative decimal values', () => {
            expect(zeroRound_ceil(-2.7)).toBe(-3)
            expect(zeroRound_ceil(-0.1)).toBe(-1)
            expect(zeroRound_ceil(-98765.999)).toBe(-98766)
        })

        it('returns the same integer value', () => {
            expect(zeroRound_ceil(5)).toBe(5)
            expect(zeroRound_ceil(-4)).toBe(-4)
        })

        it('handles zero correctly', () => {
            expect(zeroRound_ceil(0)).toBe(0)
        })
    })
})
