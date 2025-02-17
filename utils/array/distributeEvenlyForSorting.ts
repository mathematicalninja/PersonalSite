import {
    type SortAtom,
    type InnerRecusiveSortArray,
    type SortArrayState,
} from '~/types/sorting'

function tagAtomic<T>(element: T): SortAtom<T> {
    return { state: 'atom', data: element }
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
): InnerRecusiveSortArray<T> {
    return { state: state, data: arr.map((element) => tagAtomic(element)) }
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
    return { state: state, data: arr }
}

/**
 * helpful wrapper for tagArray with state 'unsorted'
 */
function tagUnsorted<T>(
    arr: Array<InnerRecusiveSortArray<T>>,
): InnerRecusiveSortArray<T> {
    return tagArray(arr, 'unsorted')
}

/**
 * Step: Define Recursive Function
 * Step: Guard against empty arrays
 * Step: If the array is a singleton, return it (not an array) tagged as atomic
 * Step: otherwise, spread the array out, then call recursively on each subarray
 * Step: tag the outermost array as unsorted
 * Step: return the tagged array
 *  */

function recursiveTagAndDistribute<T>(
    ar: Array<T>,
    int: number,
): InnerRecusiveSortArray<T> {
    // Guard against empty arrays
    if (ar.length === 0) {
        return { state: 'unsorted', data: [] }
    }

    // If the array is a singleton, return it tagged as atomic
    if (ar.length === 1) {
        return tagAtomic(ar[0])
    }

    // Spread the array out, then call recursively on each subarray
    const distributed = distributeEvenly(ar, int)
    const recursivelyDistributed = distributed.map((subarray) =>
        recursiveTagAndDistribute(subarray, int),
    )

    // Tag the outermost array as unsorted
    return tagUnsorted(recursivelyDistributed)
}
