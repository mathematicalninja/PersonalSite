import { rangeFrom } from './rangeFrom'

describe('rangeFrom', () => {
    it('returns a range from start to end inclusive', () => {
        expect(rangeFrom(1, 5)).toEqual([1, 2, 3, 4, 5])
        expect(rangeFrom(4, 8)).toEqual([4, 5, 6, 7, 8])
        expect(rangeFrom(0, 3)).toEqual([0, 1, 2, 3])
    })

    it('returns reversed array if start > end', () => {
        expect(rangeFrom(3, 2)).toEqual([3, 2])
        expect(rangeFrom(5, 1)).toEqual([5, 4, 3, 2, 1])
    })

    it('works with negative numbers', () => {
        expect(rangeFrom(-2, 2)).toEqual([-2, -1, 0, 1, 2])
        expect(rangeFrom(-3, -1)).toEqual([-3, -2, -1])
    })

    it('returns an array with a single element if start === end', () => {
        expect(rangeFrom(7, 7)).toEqual([7])
        expect(rangeFrom(0, 0)).toEqual([0])
    })
})
