import { roundToFit } from './roundToFit'

const zeroRound_ceil = Math.ceil
const zeroRound_floor = Math.floor

describe('roundToFit__NEW', () => {
    const baseShape = { width: 10.3, height: 20.7 }

    it('should round correctly for clampDirection "x"', () => {
        const result = roundToFit({
            inner: baseShape,
            clampDirection: 'x',
        })
        expect(result).toEqual({
            width: 11,
            height: 20,
        })
    })

    it('should round correctly for clampDirection "y"', () => {
        const result = roundToFit({
            inner: baseShape,
            clampDirection: 'y',
        })
        expect(result).toEqual({
            width: 10,
            height: 21,
        })
    })

    it('should round correctly for clampDirection "up"', () => {
        const result = roundToFit({
            inner: baseShape,
            clampDirection: 'up',
        })
        expect(result).toEqual({
            width: 11,
            height: 21,
        })
    })

    it('should round correctly for clampDirection "down"', () => {
        const result = roundToFit({
            inner: baseShape,
            clampDirection: 'down',
        })
        expect(result).toEqual({
            width: 10,
            height: 20,
        })
    })

    it('should return original shape for unknown clampDirection', () => {
        const result = roundToFit({
            inner: baseShape,
            clampDirection: 'unknown' as any,
        })
        expect(result).toEqual(baseShape)
    })

    it('should handle integer values correctly - x', () => {
        const intShape = { width: 15, height: 25 }
        expect(roundToFit({ inner: intShape, clampDirection: 'x' })).toEqual({
            width: 15,
            height: 25,
        })
    })

    it('should handle integer values correctly - y', () => {
        const intShape = { width: 15, height: 25 }
        expect(roundToFit({ inner: intShape, clampDirection: 'y' })).toEqual({
            width: 15,
            height: 25,
        })
    })

    it('should handle negative values correctly - up', () => {
        const negativeShape = { width: -10.8, height: -20.2 }
        expect(
            roundToFit({
                inner: negativeShape,
                clampDirection: 'up',
            }),
        ).toEqual({
            width: -11,
            height: -21,
        })
    })

    it('should handle negative values correctly - down', () => {
        const negativeShape = { width: -10.8, height: -20.2 }
        expect(
            roundToFit({
                inner: negativeShape,
                clampDirection: 'down',
            }),
        ).toEqual({
            width: -10,
            height: -20,
        })
    })
})
