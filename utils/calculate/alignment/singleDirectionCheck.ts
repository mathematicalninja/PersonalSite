import type { xy } from '~/types/layout/grid'
import { upperLower } from '~/utils/calculate/upperLower'
export function singleDirectionCheck({
    count,
    goalN,
}: {
    count: xy
    goalN: number
}): { clampDirection: 'x' | 'y' | 'none' } {
    const xWorks = upperLower({ up: count.x, down: count.y, minimum: goalN })
    const yWorks = upperLower({ up: count.y, down: count.x, minimum: goalN })
    if (xWorks && yWorks) {
        return { clampDirection: 'none' }
    }
    if (xWorks) {
        return { clampDirection: 'x' }
    }
    if (yWorks) {
        return { clampDirection: 'y' }
    }
    return { clampDirection: 'none' }
}
