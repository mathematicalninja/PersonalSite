import HeightWidthFromParent from './HeightWidthFromParent'

describe('HeightWidthFromParent', () => {
    it('returns {height: 0, width: 0} if parent ratio is 0', () => {
        const result = HeightWidthFromParent({
            ratio: 2,
            parent: { height: 0, width: 0 },
        })
        expect(result).toEqual({ height: 0, width: 0 })
    })

    it('uses parent width as restraint when parent is tall', () => {
        // parentRatio = 2
        const result = HeightWidthFromParent({
            ratio: 1,
            parent: { height: 4, width: 2 },
        })
        expect(result).toEqual({ height: 2, width: 2 })
    })

    it('uses parent height as restraint when parent is wide', () => {
        // parentRatio = 0.5
        const result = HeightWidthFromParent({
            ratio: 1,
            parent: { height: 2, width: 4 },
        })
        expect(result).toEqual({ height: 2, width: 2 })
    })

    it('rounds the results correctly', () => {
        const result = HeightWidthFromParent({
            ratio: 1.5,
            parent: { height: 5, width: 3 },
        })
        // parentRatio ≈ 1.66 > 1.5, so width is restraint
        // height = 3 * 1.5 = 4.5 --> 5, width = 3
        expect(result).toEqual({ height: 5, width: 3 })
    })

    it('handles parentRatio < ratio with rounding', () => {
        const result = HeightWidthFromParent({
            ratio: 2,
            parent: { height: 5, width: 3 },
        })
        // parentRatio ≈ 1.666 < 2, so height is restraint
        // width = 5 / 2 = 2.5 --> 3, height = 5
        expect(result).toEqual({ height: 5, width: 3 })
    })
})
