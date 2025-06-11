import { range } from './range'

describe('range', () => {
    it('returns [1] for input 1', () => {
        expect(range(1)).toEqual([1])
    })

    it('returns [1, 2, 3, 4, 5] for input 5', () => {
        expect(range(5)).toEqual([1, 2, 3, 4, 5])
    })

    it('returns an empty array for input 0', () => {
        expect(range(0)).toEqual([])
    })
})
