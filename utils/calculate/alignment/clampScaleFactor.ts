// TODO: defunct

import type { ElementShape, ClampDirection, xy } from '~/types/layout/grid'

/**
 *
 * @param inner ElementShape of the object being fit *inside*.
 * @param outer ElementShape of the *space* the object is being fit into.
 * @param clamp the direction to round the scale factor in.
 * @returns the scale factor that the **inner** element needs to be **multiplied** by.
 */

export function clampScaleFactor({
    gridCount,
    outer,
    inner,
    clamp,
}: {
    gridCount: xy
    outer: ElementShape
    inner: ElementShape
    clamp: ClampDirection
}): number {
    switch (clamp) {
        // TODO: swap inner  for   innerFitted -> an ElementShape that is **after** the scaling operation.
        case 'x':
            return outer.width / (inner.width * gridCount.x)
        case 'y':
            return outer.height / (inner.height * gridCount.y)
        case 'up':
            return Math.max(
                outer.width / (inner.width * gridCount.x),
                outer.height / (inner.height * gridCount.y),
            )
        case 'down':
            return Math.min(
                outer.width / (inner.width * gridCount.x),
                outer.height / (inner.height * gridCount.y),
            )
        default:
            return 1
    }
}
