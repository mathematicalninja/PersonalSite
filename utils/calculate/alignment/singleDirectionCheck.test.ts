import { singleDirectionCheck } from './singleDirectionCheck'
import { upperLower } from '~/utils/manipulation/upperLower'

// Mock upperLower to control its output
jest.mock('~/utils/manipulation/upperLower', () => ({
    upperLower: jest.fn(),
}))

describe('singleDirectionCheck', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('returns clampDirection "none" if both xWorks and yWorks are true', () => {
        ;(upperLower as jest.Mock)
            .mockReturnValueOnce(true) // xWorks
            .mockReturnValueOnce(true) // yWorks

        const result = singleDirectionCheck({ count: { x: 2, y: 3 }, goalN: 2 })
        expect(result).toEqual({ clampDirection: 'none' })
        expect(upperLower).toHaveBeenCalledTimes(2)
    })

    it('returns clampDirection "x" if only xWorks is true', () => {
        ;(upperLower as jest.Mock)
            .mockReturnValueOnce(true) // xWorks
            .mockReturnValueOnce(false) // yWorks

        const result = singleDirectionCheck({ count: { x: 5, y: 1 }, goalN: 3 })
        expect(result).toEqual({ clampDirection: 'x' })
    })

    it('returns clampDirection "y" if only yWorks is true', () => {
        ;(upperLower as jest.Mock)
            .mockReturnValueOnce(false) // xWorks
            .mockReturnValueOnce(true) // yWorks

        const result = singleDirectionCheck({ count: { x: 1, y: 5 }, goalN: 3 })
        expect(result).toEqual({ clampDirection: 'y' })
    })

    it('returns clampDirection "none" if neither xWorks nor yWorks is true', () => {
        ;(upperLower as jest.Mock)
            .mockReturnValueOnce(false) // xWorks
            .mockReturnValueOnce(false) // yWorks

        const result = singleDirectionCheck({ count: { x: 1, y: 1 }, goalN: 3 })
        expect(result).toEqual({ clampDirection: 'none' })
    })
})
