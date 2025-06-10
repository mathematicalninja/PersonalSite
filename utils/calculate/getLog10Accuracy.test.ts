import { getLog10Accuracy } from './getLog10Accuracy'

describe('getLog10Accuracy', () => {
    it('300 ==> 3', () => {
        expect(getLog10Accuracy(300)).toBe(3)
    })
    it('0.02==> -2', () => {
        expect(getLog10Accuracy(0.02)).toBe(-2)
    })
    it('100 ==> 3', () => {
        expect(getLog10Accuracy(100)).toBe(2)
    })
    it('0.01==> -2', () => {
        expect(getLog10Accuracy(0.01)).toBe(-2)
    })
})
