// TODO: delete.

import type { ElementShape } from '~/types/layout/grid'
import HeightWidthRatio from './HeightWidthRatio'

export default function HeightWidthFromParent({
    ratio,
    parent,
}: {
    ratio: number
    parent: ElementShape
}): ElementShape {
    /**
     * Takes an internal height/width ratio, and returns the (Height, Width) needed to fill the Parent element without warping aspect-ratio.
     *
     */
    const parentRatio = HeightWidthRatio(parent)
    if (parentRatio === 0) return { height: 0, width: 0 }
    if (parentRatio >= ratio) {
        // pH/pW > h/w = r
        // parent is taller (proportionally) than the image
        // parent width is the restraint
        // pH = pW * r
        return {
            height: Math.round(parent.width * ratio),
            width: Math.round(parent.width),
        }
    }
    if (parentRatio < ratio) {
        // pH/pW < h/w = r
        // parent is wider (proportionally) than the image
        // parent height is the restraint
        // pW = pH / r
        return {
            height: Math.round(parent.height),
            width: Math.round(parent.height / ratio),
        }
    } else {
        return { height: 100, width: 100 }
    }
}
