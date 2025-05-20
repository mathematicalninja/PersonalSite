import type { ElementShape, xy } from '~/types/layout/grid'

/**
 * takes value pairs and returns a parir of scale factors.
 * @param inner ElementShape of the object being fit *inside*.
 * @param outer ElementShape of the *space* the object is being fit into.
 * @param gridCount the number of elements that can fit in the grid.
 * @returns  the scale factors that the **inner** element needs to be **multiplied** by.
 */
export function scaleFactors({
    count,
    outer,
    inner,
}: {
    count: xy
    outer: ElementShape
    inner: ElementShape
}): xy {
    if (outer.width === 0 || inner.width === 0 || count.x === 0) {
        var x: number = 0
    } else {
        var x = outer.width / (inner.width * count.x)
    }

    if (outer.height === 0 || inner.height === 0 || count.y === 0) {
        var y: number = 0
    } else {
        var y = outer.height / (inner.height * count.y)
    }
    return {
        x: x,
        y: y,
    }
}
