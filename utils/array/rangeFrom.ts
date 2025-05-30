/**
 * @returns an array of numbers starting from `start` to `end` (inclusive).
 */

export function rangeFrom(start: number, end: number): Array<number> {
    if (start == end) {
        return [start]
    }
    const arr = []
    if (end < start) {
        // counts backwards
        for (let i = end; i <= start; i++) {
            arr.push(end + start - i)
        }
        return arr
    }
    // start < end: count forwards.
    for (let i = start; i <= end; i++) {
        arr.push(i)
    }
    return arr
}
