import type { ElementShape } from '~/types/layout/grid'
import innerFitToOuter from './innerFitToOuter'

const SquareOuter: ElementShape = { width: 100, height: 100 }
const WideOuter: ElementShape = { width: 300, height: 100 }
const TallOuter: ElementShape = { width: 100, height: 300 }

const SquareInner: ElementShape = { width: 50, height: 50 }
const WideInner: ElementShape = { width: 100, height: 50 }
const TallInner: ElementShape = { width: 50, height: 100 }
const LargeInner: ElementShape = { width: 150, height: 150 }

const nullShape: ElementShape = { width: 0, height: 0 }
const nullWidth: ElementShape = { width: 0, height: 100 }
const nullHeight: ElementShape = { width: 100, height: 0 }

describe('innerFitToOuter', () => {
    it('handles inners with 0 entry', () => {
        expect(
            innerFitToOuter({
                inner: nullShape,
                outer: SquareOuter,
            }),
        ).toEqual(nullShape)
        expect(
            innerFitToOuter({
                inner: nullWidth,
                outer: SquareOuter,
            }),
        ).toEqual(nullShape)
        expect(
            innerFitToOuter({
                inner: nullHeight,
                outer: SquareOuter,
            }),
        ).toEqual(nullShape)
    })

    it('handles outer with 0 entry', () => {
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: nullShape,
            }),
        ).toEqual(nullShape)
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: nullWidth,
            }),
        ).toEqual(nullShape)
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: nullHeight,
            }),
        ).toEqual(nullShape)
    })

    it('SquareOuter, SquareInner', () => {
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: SquareOuter,
            }),
        ).toEqual(SquareOuter)
    })

    it('SquareOuter, WideInner', () => {
        expect(
            innerFitToOuter({
                inner: WideInner,
                outer: SquareOuter,
            }),
        ).toEqual(WideInner)
    })

    it('SquareOuter, TallInner', () => {
        expect(
            innerFitToOuter({
                inner: TallInner,
                outer: SquareOuter,
            }),
        ).toEqual(TallInner)
    })

    it('WideOuter, SquareInner', () => {
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: WideOuter,
            }),
        ).toEqual({ width: 100, height: 100 })
    })

    it('WideOuter, WideInner', () => {
        expect(
            innerFitToOuter({
                inner: WideInner,
                outer: WideOuter,
            }),
        ).toEqual({ width: 200, height: 100 })
    })

    it('WideOuter, TallInner', () => {
        expect(
            innerFitToOuter({
                inner: TallInner,
                outer: WideOuter,
            }),
        ).toEqual({ width: 50, height: 100 })
    })

    it('TallOuter, SquareInner', () => {
        expect(
            innerFitToOuter({
                inner: SquareInner,
                outer: TallOuter,
            }),
        ).toEqual({ width: 100, height: 100 })
    })

    it('TallOuter, WideInner', () => {
        expect(
            innerFitToOuter({
                inner: WideInner,
                outer: TallOuter,
            }),
        ).toEqual({ width: 100, height: 50 })
    })

    it('TallOuter, TallInner', () => {
        expect(
            innerFitToOuter({
                inner: TallInner,
                outer: TallOuter,
            }),
        ).toEqual({ width: 100, height: 200 })
    })

    it('SquareOuter, LargeInner', () => {
        expect(
            innerFitToOuter({
                inner: LargeInner,
                outer: SquareOuter,
            }),
        ).toEqual({ width: 100, height: 100 })
    })

    it('WideOuter, LargeInner', () => {
        expect(
            innerFitToOuter({
                inner: LargeInner,
                outer: WideOuter,
            }),
        ).toEqual({ width: 100, height: 100 })
    })

    it('TallOuter, LargeInner', () => {
        expect(
            innerFitToOuter({
                inner: LargeInner,
                outer: TallOuter,
            }),
        ).toEqual({ width: 100, height: 100 })
    })
})
