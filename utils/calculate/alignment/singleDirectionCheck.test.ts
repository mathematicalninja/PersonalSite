import { singleDirectionCheck } from './singleDirectionCheck'
import { upperLower } from '~/utils/calculate/upperLower'

describe('singleDirectionCheck', () => {
    it('returns clampDirection "none" if both xWorks and yWorks are true', () => {
        const result = singleDirectionCheck({
            count: { x: 2.2, y: 3.2 },
            goalN: 6,
        })
        expect(result).toEqual({ clampDirection: 'none' })
    })

    it('returns clampDirection "x" if only xWorks is true', () => {
        const result = singleDirectionCheck({
            count: { x: 1.5, y: 5.5 },
            goalN: 8,
        })
        expect(result).toEqual({ clampDirection: 'x' })
    })

    it('returns clampDirection "y" if only yWorks is true', () => {
        const result = singleDirectionCheck({
            count: { x: 5.5, y: 1.5 },
            goalN: 8,
        })
        expect(result).toEqual({ clampDirection: 'y' })
    })

    it('returns clampDirection "none" if neither xWorks nor yWorks is true', () => {
        const result = singleDirectionCheck({ count: { x: 1, y: 1 }, goalN: 3 })
        expect(result).toEqual({ clampDirection: 'none' })
    })
})
