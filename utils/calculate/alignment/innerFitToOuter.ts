import HeightWidthFromParent from './HeightWidthFromParent'
import HeightWidthRatio from './HeightWidthRatio'

/**
 * @param inner ElementShape - The shape of the inner element.
 * @param outer ElementShape - The shape of the outer element.
 * @returns \{inner:ElementShape} - The shape of the inner element that fits inside the outer element.
 */
export default function innerFitToOuter({
    inner,
    outer,
}: {
    inner: ElementShape
    outer: ElementShape
}): ElementShape {
    /**
     * Takes an inner element and an outer element, and returns the {width: number;height: number;} needed to fit the inner element inside the outer element without warping aspect-ratio.
     *
     */
    const innerRatio = HeightWidthRatio(inner)
    if (innerRatio === 0) return { height: 0, width: 0 }
    const outerRatio = HeightWidthRatio(outer)
    if (outerRatio === 0) return { height: 0, width: 0 }

    return HeightWidthFromParent({ ratio: innerRatio, parent: outer })
}
