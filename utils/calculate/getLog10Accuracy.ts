import { zeroRound_ceil } from './zeroRound'

/**
 * e.g. 0.03 ==> -2, 300 ==> 3
 *
 * @returns The minimum 10 exponent needed to accurately represent value.
 */
export function getLog10Accuracy(value: number) {
    return zeroRound_ceil(Math.log10(value))
}
