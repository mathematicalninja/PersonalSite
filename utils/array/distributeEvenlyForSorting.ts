import {
    type SortAtom,
    type InnerRecusiveSortArray,
    type SortArrayState,
    type AtomicArray,
    type SortArray,
    type SortArrayAtoms,
} from '~/types/sorting'

function tagAtomic<T>(element: T): SortAtom<T> {
    return {
        state: 'atom',
        data: element,
    }
}

/**
 * Use this ONLY at the ground state of recursion.
 * @param arr The array containing would be atoms
 * @param state the state the array is to be returned in deaults to 'unsorted'
 * @returns
 */
function declareArrayAtomic<T>(
    arr: Array<T>,
    state: SortArrayState = 'unsorted',
): SortArrayAtoms<T> {
    return {
        state: state,
        data: arr.map((element) => tagAtomic(element)),
    }
}

/**
 * Tag an array with a state at anly level of recursion EXCEPT the ground level
 * @param arr
 * @param state
 * @returns
 */
function tagArray<T>(
    arr: Array<InnerRecusiveSortArray<T>>,
    state: SortArrayState,
): InnerRecusiveSortArray<T> {
    return {
        state: state,
        data: arr,
    }
}

/**
 * Step: Define Recursive Function
 * Step: Guard against empty arrays
 * Step: If the array is a singleton, return it (not an array) tagged as atomic
 * Step: otherwise, spread the array out, then call recursively on each subarray
 * Step: tag the outermost array as unsorted
 * Step: return the tagged array
 *  */

export function recursiveTagAndDistribute<T>(
    ar: Array<T>,
    int: number,
): InnerRecusiveSortArray<T> {
    // Guard against empty arrays
    if (ar.length === 0) {
        return { state: 'sorted', data: [] }
    }

    // If the array is a singleton, return it tagged as atomic
    if (ar.length === 1) {
        return tagAtomic(ar[0])
    }

    // If the array is smaller than the number of piles, return it tagged as unsorted Atomic
    if (ar.length <= int) {
        return declareArrayAtomic(ar, 'unsorted')
    }

    // Spread the array out, then call recursively on each subarray
    const split = singleSplit(ar, int)

    const r: SortArray<T> = empty('unsorted')

    for (let i = 0; i < split.length; i++) {
        r.data.push(recursiveTagAndDistribute(split[i], int))
    }
    // const recursivelyDistributed = distributed.map((subarray) =>
    // recursiveTagAndDistribute(subarray, int),
    // )

    // Tag the outermost array as unsorted
    return r
}
function empty<T>(state: SortArrayState): SortArray<T> {
    return { data: [], state: state }
}

function singleSplit<T>(ar: Array<T>, int: number): Array<Array<T>> {
    if (ar.length <= int) {
        //edge case, shouldn't be reached in practice
        return ar.map((e) => [e])
    }
    const r: Array<Array<T>> = Array.from({ length: int }, () => [])
    for (let index = 0; index < ar.length; index++) {
        const element = ar[index]
        r[index % int].push(element)
    }
    return r
}
