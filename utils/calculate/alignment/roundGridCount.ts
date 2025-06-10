import type { ClampDirection, xy } from '~/types/layout/grid'
import { zeroRound_ceil, zeroRound_floor } from '~/utils/calculate/zeroRound'

/**
 *
 * rounds the given grid count into the clamp direction.
 * @param grid then (possibly **float**) number of elements to fit in the grid in each direction (x, y).
 * @param clampDirection the **dominant** direction in which the grid is being clamped.
 * @returns **integer** valued grid and the clampDirection.
 */
export function roundGridCount({
    grid,
    clampDirection,
}: {
    grid: xy
    clampDirection: ClampDirection
}) {
    // Note that 'floor' means that the element count was being shrunk to fit, so we can round their size up (by a partial pixel) and still fit them in.
    switch (clampDirection) {
        case 'x':
            return {
                x: zeroRound_ceil(grid.x),
                y: zeroRound_floor(grid.y),
            }
        case 'y':
            return {
                x: zeroRound_floor(grid.x),
                y: zeroRound_ceil(grid.y),
            }
        case 'up':
            return {
                x: zeroRound_ceil(grid.x),
                y: zeroRound_ceil(grid.y),
            }
        case 'down':
            return {
                x: zeroRound_floor(grid.x),
                y: zeroRound_floor(grid.y),
            }
        default:
            return grid
    }
}
