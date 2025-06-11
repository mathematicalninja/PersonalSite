/**
 * used to floor the **Absolute** value of a number.
 * @param value - the value to round
 * @returns the rounded value, rounded towards zero
 */
export function zeroRound_floor(value: number): number {
    return value > 0 ? Math.floor(value) : Math.ceil(value)
}

/**
 * used to ceil the **Absolute** value of a number.
 * @param value - the value to round
 * @returns the rounded value, rounded away from zero
 */
export function zeroRound_ceil(value: number): number {
    return value > 0 ? Math.ceil(value) : Math.floor(value)
}
