import type { ElementShape } from '~/types/layout/grid'

import { zeroRound_floor } from '~/utils/manipulation/zeroRound'

/**
 * resizes an ElementShape to fit **inside** a grid of the given size.
 * Note the rounding down to the nearest pixel.
 * @param inner ElementShape of the object being fit *inside*.
 * @param scaleFactor the scale factor that the **inner** element needs to be **multiplied** by.
 */
export function clampToGrid({
    inner,
    scaleFactor,
}: {
    inner: ElementShape
    scaleFactor: number
}): ElementShape {
    return {
        width: zeroRound_floor(inner.width * scaleFactor),
        height: zeroRound_floor(inner.height * scaleFactor),
    }
}

// TODO: ensure that rounding is towards 0 not -infinity for negative values.
