import type { ElementShape, ClampDirection } from '~/types/layout/grid'
import { zeroRound_ceil, zeroRound_floor } from '~/utils/calculate/zeroRound'

export function roundToFit({
    inner,
    clampDirection,
}: {
    inner: ElementShape
    clampDirection: ClampDirection
}): ElementShape {
    // Note that 'floor' means that the element count was being shrunk to fit, so we can round their size up (by a partial pixel) and still fit them in.
    switch (clampDirection) {
        case 'x':
            return {
                height: zeroRound_floor(inner.height),
                width: zeroRound_ceil(inner.width),
            }
        case 'y':
            return {
                height: zeroRound_ceil(inner.height),
                width: zeroRound_floor(inner.width),
            }
        case 'up':
            return {
                height: zeroRound_ceil(inner.height),
                width: zeroRound_ceil(inner.width),
            }
        case 'down':
            return {
                height: zeroRound_floor(inner.height),
                width: zeroRound_floor(inner.width),
            }
        default:
            return inner
    }
}
