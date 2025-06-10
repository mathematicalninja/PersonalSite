import type { ClampDirection, ElementShape, xy } from '~/types/layout/grid'

import { gridAlgebra_float } from '~/utils/calculate/alignment/gridAlgebra_float'

import { countRoundDirection } from '~/utils/calculate/alignment/countRoundDirection'
import { roundGridCount } from '~/utils/calculate/alignment/roundGridCount'
import { scaleFactors } from '~/utils/calculate/alignment/scaleFactors'
import { roundToFit } from '~/utils/calculate/alignment/roundToFit'
import { clampScaleFactor } from '~/utils/calculate/alignment/clampScaleFactor'
import { clampToGrid } from '~/utils/calculate/alignment/clampToGrid'
import { localFileLog } from '~/utils/logging/localFileLog'

function a({
    goalN,
    inner,
    outer,
}: {
    goalN: number
    inner: ElementShape

    outer: ElementShape
}): { count: xy /*float*/ } {
    // use pure algebra to calculate exact float.
    // via gridAlgebra_float
    const count = gridAlgebra_float({
        inner,
        outer,
        goalN,
    }).gridCount
    return { count }
}

function b({ count, goalN }: { count: xy; goalN: number }): {
    clampDirection: ClampDirection
} {
    return countRoundDirection({
        goalN,
        grid: { x: count.x, y: count.y },
    })
}

function c({
    count,
    clampDirection,
}: {
    count: xy /*float*/
    clampDirection: ClampDirection
}): { count: xy /*int*/ } {
    const count_int = roundGridCount({
        grid: { x: count.x, y: count.y },
        clampDirection,
    })
    return { count: count_int }
}

function d({
    inner,
    clampDirection,
}: {
    inner: ElementShape
    clampDirection: ClampDirection
}): { inner: ElementShape /* float*/ } {
    // via roundGridCount
    const inner_int = roundToFit({
        inner,
        clampDirection,
    })
    return { inner: inner_int }
}

function e({
    gridCount,
    outer,
    inner,
    clamp,
}: {
    gridCount: xy
    outer: ElementShape
    inner: ElementShape
    clamp: ClampDirection
}): { scaleFactor: number } {
    const scale = clampScaleFactor({
        gridCount,
        outer,
        inner,
        clamp,
    })
    return { scaleFactor: scale }
}
function f({
    inner,
    scaleFactor,
}: {
    inner: ElementShape /* float*/
    scaleFactor: number
}): {
    inner: ElementShape /* int */
} {
    // via clampToGrid
    const inner_clamp = clampToGrid({
        inner,
        scaleFactor,
    })
    return { inner: inner_clamp }
}

export function gridAlgebra_int({
    goalN,
    inner,
    outer,
}: {
    goalN: number
    inner: ElementShape
    outer: ElementShape
}): { inner: ElementShape; count: xy } {
    const A = a({ goalN, inner, outer })
    const B = b({ count: A.count, goalN })
    const C = c({ count: A.count, clampDirection: B.clampDirection })

    const D = d({
        inner,
        clampDirection: B.clampDirection,
    })
    const E = e({
        gridCount: C.count,
        outer,
        inner: D.inner,
        clamp: B.clampDirection,
    })
    const F = f({ inner: D.inner, scaleFactor: E.scaleFactor })

    return {
        inner: F.inner,
        count: C.count,
    }
}
