import { roundGridCount } from './roundGridCount'

describe('roundGridCount_NEW', () => {
    const floatGrid = { x: 2.3, y: 5.7 }

    it('rounds correctly when clampDirection is "x"', () => {
        const result = roundGridCount({
            grid: floatGrid,
            clampDirection: 'x',
        })
        expect(result).toEqual({ x: 3, y: 5 })
    })

    it('rounds correctly when clampDirection is "y"', () => {
        const result = roundGridCount({
            grid: floatGrid,
            clampDirection: 'y',
        })
        expect(result).toEqual({ x: 2, y: 6 })
    })

    it('rounds correctly when clampDirection is "up"', () => {
        const result = roundGridCount({
            grid: floatGrid,
            clampDirection: 'up',
        })
        expect(result).toEqual({ x: 3, y: 6 })
    })

    it('rounds correctly when clampDirection is "down"', () => {
        const result = roundGridCount({
            grid: floatGrid,
            clampDirection: 'down',
        })
        expect(result).toEqual({ x: 2, y: 5 })
    })

    it('returns the original grid for clampDirection none (default case)', () => {
        const result = roundGridCount({
            grid: floatGrid,
            clampDirection: 'none',
        })
        expect(result).toBe(floatGrid)
    })

    it('handles integer inputs without change when direction is up or down', () => {
        const intGrid = { x: 4, y: 7 }
        expect(roundGridCount({ grid: intGrid, clampDirection: 'up' })).toEqual(
            { x: 4, y: 7 },
        )
        expect(
            roundGridCount({ grid: intGrid, clampDirection: 'down' }),
        ).toEqual({ x: 4, y: 7 })
    })

    it('handles negative floats correctly', () => {
        const negGrid = { x: -2.3, y: -3.7 }
        expect(roundGridCount({ grid: negGrid, clampDirection: 'x' })).toEqual({
            x: -3,
            y: -3,
        })
        expect(roundGridCount({ grid: negGrid, clampDirection: 'y' })).toEqual({
            x: -2,
            y: -4,
        })
    })
})
