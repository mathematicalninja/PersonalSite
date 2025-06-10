import { pricePer } from './pricePer'

describe('pricePer', () => {
    describe('"good" values', () => {
        it('calculates price per unit correctly', () => {
            expect(pricePer({ price: 10, quantity: 2, goalAmount: 4 })).toBe(20)
            expect(pricePer({ price: 20, quantity: 10, goalAmount: 10 })).toBe(
                20,
            )
            expect(pricePer({ price: 100, quantity: 50, goalAmount: 25 })).toBe(
                50,
            )
        })

        it('handles non-conversions', () => {
            expect(
                pricePer({ price: 7.99, quantity: 1000, goalAmount: 1000 }),
            ).toBe(7.99)
            expect(
                pricePer({ price: 5.5, quantity: 500, goalAmount: 500 }),
            ).toBe(5.5)
        })

        it('handles floating point values', () => {
            expect(
                pricePer({ price: 9.99, quantity: 2.5, goalAmount: 5 }),
            ).toBeCloseTo(19.98)
        })
    })
    describe('"error" values', () => {
        it('returns -1 if price is negative', () => {
            expect(pricePer({ price: -1, quantity: 2, goalAmount: 4 })).toBe(-1)
        })

        it('returns -1 if quantity is negative', () => {
            expect(pricePer({ price: 10, quantity: -2, goalAmount: 4 })).toBe(
                -1,
            )
        })

        it('returns -1 if goalAmount is negative', () => {
            expect(pricePer({ price: 10, quantity: 2, goalAmount: -4 })).toBe(
                -1,
            )
        })

        it('returns -1 if quantity is zero', () => {
            expect(pricePer({ price: 10, quantity: 0, goalAmount: 2 })).toBe(-1)
        })

        it('returns -1 if all values are zero', () => {
            expect(pricePer({ price: 0, quantity: 0, goalAmount: 0 })).toBe(-1)
        })

        it('returns -1 if price and quantity are zero but goalAmount is positive', () => {
            expect(pricePer({ price: 0, quantity: 0, goalAmount: 5 })).toBe(-1)
        })
    })
})
