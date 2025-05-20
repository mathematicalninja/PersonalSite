import { countRoundDirection } from './countRoundDirection'
import type { GridCount, ClampDirection } from '~/types/layout/grid'

describe('countRoundDirection_NEW', () => {
    it('returns none when both counts are integers (exact fit)', () => {
        const result = countRoundDirection({
            grid: { x: 4, y: 5 },
            goalN: 20,
        })
        expect(result.clampDirection).toBe('none')
    })

    it('returns down when both floored counts are enough', () => {
        const result = countRoundDirection({
            grid: { x: 4.9, y: 5.9 },
            goalN: 20,
        })
        expect(result.clampDirection).toBe('down')
    })

    it('returns up when both ceiled/floored combos are too small', () => {
        const result = countRoundDirection({
            grid: { x: 2.1, y: 2.1 },
            goalN: 9,
        })
        expect(result.clampDirection).toBe('up')
    })

    it('returns x when xScale is bigger', () => {
        const result = countRoundDirection({
            grid: { x: 3.8, y: 3.1 },
            goalN: 12,
        })
        expect(result.clampDirection).toBe('x')
    })

    it('returns y when yScale is bigger', () => {
        const result = countRoundDirection({
            grid: { x: 3.1, y: 3.8 },
            goalN: 12,
        })
        expect(result.clampDirection).toBe('y')
    })

    it('handles edge case where x or y is exactly integer and the other is not', () => {
        const result = countRoundDirection({
            grid: { x: 4, y: 3.5 },
            goalN: 15,
        })
        // Should not be 'none', should pick direction
        expect(result.clampDirection).toBe('y')
    })
    it('works for real failed test.', () => {
        const result = countRoundDirection({
            grid: { x: 1.4, y: 2.9 },
            goalN: 4,
        })
        expect(result.clampDirection).toBe('x')
    })
})
