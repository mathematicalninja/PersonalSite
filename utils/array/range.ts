/**
 *
 * @returns **1-indexed** array of integers from 1 to `int`
 */
export function range(int: number): Array<number> {
    const arr = [...Array(int + 1).keys()]
    arr.shift()
    return arr
}
