import type { GridCount, ClampDirection, xy } from '~/types/layout/grid'
import { singleDirectionCheck } from '~/utils/calculate/alignment/singleDirectionCheck'

/**
 *
 * @param grid: xy of floats to be rounded
 * @returns 'x' | 'y' if that direction is to be incread.
 * @returns 'up' | 'down' if both directions are to be rounded.
 * @returns 'none' if there is already an exact fit.
 */

export function countRoundDirection({
    grid,
    goalN,
}: {
    grid: xy
    goalN: number
}): {
    clampDirection: ClampDirection
} {
    const yFloor = Math.floor(grid.y)
    const xFloor = Math.floor(grid.x)
    const yCeil = Math.ceil(grid.y)
    const xCeil = Math.ceil(grid.x)

    // Exact Integer fit
    if (grid.x % 1 === 0 && grid.y % 1 === 0) {
        return { clampDirection: 'none' }
    }

    // Both sides are too big
    if (yFloor * xFloor >= goalN) {
        return { clampDirection: 'down' }
    }
    // Either round direction is too small
    if (yCeil * xFloor < goalN && xCeil * yFloor < goalN) {
        return { clampDirection: 'up' }
    }

    // Checking how much "dead space" would be left in each rounding direction, and choosing the one that leaves the least.

    // Note that (as scale factors are all that matters here) the algebra works by changing dimensional variables to make a 1x1 square.

    const directionCheck: { clampDirection: 'x' | 'y' | 'none' } =
        singleDirectionCheck({
            count: { x: grid.x, y: grid.y },
            goalN,
        })

    if (directionCheck.clampDirection === 'x') {
        return { clampDirection: 'x' }
    }
    if (directionCheck.clampDirection === 'y') {
        return { clampDirection: 'y' }
    }

    const Area = grid.x * grid.y

    const xScaleUp = xCeil / grid.x
    const yScaleUp = yCeil / grid.y

    const yUpArea = yCeil * xFloor * xScaleUp ** 2
    const xUpArea = xCeil * yFloor * yScaleUp ** 2

    const xDeadArea = Area - xUpArea
    const yDeadArea = Area - yUpArea

    return xDeadArea > yDeadArea
        ? { clampDirection: 'y' }
        : { clampDirection: 'x' }
}
