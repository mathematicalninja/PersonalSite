import type { ElementShape } from '~/types/layout/grid'

export default function HeightWidthRatio(shape: ElementShape): number {
    if (shape.height === 0 || shape.width === 0) return 0
    return shape.height / shape.width
}
