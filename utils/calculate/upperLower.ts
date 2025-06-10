import { zeroRound_floor } from '~/utils/calculate/zeroRound'
import { zeroRound_ceil } from '~/utils/calculate/zeroRound'
/**
 * Checks whether the (absolute value) rounding of the product is greater than or equal to the minimum.
 * @param up number to be rounded up
 * @param down number to be rounded down
 * @param minimum minimum number needed
 * @returns "up * down" >= minimum
 */
export function upperLower({
    up,
    down,
    minimum,
}: {
    up: number
    down: number
    minimum: number
}): boolean {
    return (
        Math.abs(zeroRound_ceil(up)) * Math.abs(zeroRound_floor(down)) >=
        Math.abs(minimum)
    )
}
