import type { ElementShape, xy } from '~/types/layout/grid'

/**
 *
 * @param inner ElementShape of the object being fit *inside*.
 * @param outer ElementShape of the *space* the object is being fit into.
 * @param goalN the number of inner objects that should fit inside the outer object.
 * @returns
 *
 * gridCount: **float** x/y that fit in the grid
 *
 * scaleFactor: how much the inner object should be scaled to fit inside the outer object.
 *
 * elementShape: width/height of the inner object after scaling.
 *
 *
 */
export function gridAlgebra_float({
    inner,
    outer,
    goalN,
}: {
    inner: ElementShape
    outer: ElementShape
    goalN: number
}): { gridCount: xy } {
    // This function works by changing variables to use an innerObject that is a perfect square (keeping x-value fixed), then fitting that inside the outerObject along the y-value.
    // Then simple algebra lets us count how many squares should fit inside the sub-square of the outerObject. (i.e. how many times the innerObject fits inside the outerObject vertically)
    // We can then use this to calculate the number of times the small square fits inside the outer rectangle horizontally (scaled aclong the y-axis).
    //
    // We then change the variables back to calculate the scale factor needed to fit the innerObject inside the outerObject without distortion.
    const innerRatio = inner.width / inner.height
    const outerRatio = outer.width / outer.height

    // by taking (inner.height := inner.height * innerRatio) we get the width of the innerObject if it were a square.
    // Then by taking (outer.width := outer.width * innerRatio) we get a square subsection of the rescaled outerObject to preform calculoations in.

    // Algebra gives:
    const squareRatio = innerRatio / outerRatio

    const y = Math.sqrt(goalN * squareRatio)
    const x = y / squareRatio

    return { gridCount: { x: x, y: y } }
}
