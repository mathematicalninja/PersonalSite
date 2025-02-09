import HeightWidthRatio from './HeightWidthRatio'

export default function HeightWidthFromParent(
    Ratio: number,
    parentHeight: number,
    parentWidth: number,
): [number, number] {
    /**
     * Takes an internal height/width ratio, and returns the (Height, Width) needed to fill the Parent element without warping aspect-ratio.
     *
     */
    const parentRatio = HeightWidthRatio(parentHeight, parentWidth)
    if (parentRatio === 0) return [0, 0]
    if (parentRatio >= Ratio) {
        // pH/pW > h/w = r
        // parent is taller (proportionally) than the image
        // parent width is the restraint
        // pH = pW * r
        return [
            Math.round(parentWidth * Ratio), 
            Math.round(parentWidth)
        ]
    }
    if (parentRatio < Ratio) {
        // pH/pW < h/w = r
        // parent is wider (proportionally) than the image
        // parent height is the restraint
        // pW = pH / r
        return [
            Math.round(parentHeight), 
            Math.round(parentHeight / Ratio)
        ]
    } else {
        return [100, 100]
    }
}
