import { upperLower } from './upperLower'

describe('upperLower', () => {
    it('returns true when ceil(up) * floor(down) >= minimum', () => {
        expect(upperLower({ up: 2.1, down: 3.9, minimum: 5 })).toBe(true) // 3 * 3 = 9 > 5
    })

    it('returns true when ceil(up) * floor(down) == minimum', () => {
        expect(upperLower({ up: 2.0, down: 3.0, minimum: 6 })).toBe(true) // 2 * 3 = 6 == 6
    })

    it('returns false when ceil(up) * floor(down) < minimum', () => {
        expect(upperLower({ up: 1.2, down: 2.8, minimum: 10 })).toBe(false) // 2 * 2 = 4 < 10
    })

    it('handles negative numbers correctly', () => {
        expect(upperLower({ up: -2.7, down: -3.2, minimum: 5 })).toBe(true) // 3 * 3 = 9 > 5
        expect(upperLower({ up: -2.7, down: -3.2, minimum: 10 })).toBe(false) // 9 < 10
        expect(upperLower({ up: 2.7, down: -3.2, minimum: 5 })).toBe(true) // 9 > 5
    })

    it('zero values **almost** always return false', () => {
        expect(upperLower({ up: 0, down: 0, minimum: 0 })).toBe(true) // 0 * 0 = 0 == 0
        expect(upperLower({ up: 0.1, down: 0.9, minimum: 0 })).toBe(true) // 1 * 0 = 0 > 0
        expect(upperLower({ up: 0.1, down: 0.9, minimum: -1 })).toBe(false) // 1 * 0 = 0 > -1
        expect(upperLower({ up: 0.1, down: 0.9, minimum: 1 })).toBe(false) // 1 * 0 = 0 < 1
    })
})
