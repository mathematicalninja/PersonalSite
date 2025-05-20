import type { ElementShape } from '~/types/layout/grid'

export function makeShape({ x, y }: { x: number; y: number }): ElementShape {
    return { width: x, height: y }
}
