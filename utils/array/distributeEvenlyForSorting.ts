import {
    unsortedConst,
    tagAtomic,
    type NlognArray,
    type ARRAY_STATE,
    type NlognElement,
    type NlognArray_Atoms,
} from '~/types/nlogn/dataStruct'

/**
 * Use this ONLY at the ground state of recursion.
 * @param arr The array containing would be atoms
 * @param state the state the array is to be returned in deaults to 'unsorted'
 * @returns an array of atoms, in the state specified
 */
export function declareArrayAtomic<T>(
    arr: Array<T>,
    state: ARRAY_STATE = unsortedConst,
): NlognArray_Atoms<T> {
    return {
        state: state,
        data: arr.map((element) => tagAtomic(element)),
    }
}

/**
 * Create a dummy NlognArray with no data
 * @param state:ARRAY_STATE
 * @returns empty NlognArray with the state set
 */
function empty<T>(state: ARRAY_STATE): NlognArray<T> {
    return { data: [], state: state }
}

/**
 *
 * @param ar the array being split
 * @param pileCap the number of piles to split into
 * @returns
 */
function singleSplit<T>(ar: Array<T>, pileCap: number): Array<Array<T>> {
    if (ar.length <= pileCap) {
        //edge case, shouldn't be reached in practice
        return ar.map((e) => [e])
    }
    const r: Array<Array<T>> = Array.from({ length: pileCap }, () => [])
    for (let index = 0; index < ar.length; index++) {
        const element = ar[index]
        r[index % pileCap].push(element)
    }
    return r
}

/**
 * Tag an array with a state at anly level of recursion EXCEPT Atoms
 * @param arr
 * @param state
 * @returns
 */
function tagArray<T>(
    arr: Array<NlognElement<T>>,
    state: ARRAY_STATE,
): NlognElement<T> {
    return {
        state: state,
        data: arr,
    }
}

/**
 *
 * @param ar an array of anything
 * @param int the number of "piles" to split it into
 * @returns a recursive array, bottom later tagged atomic, each other layer tagged unsorted.
 */
export function recursiveTagAndDistribute<T>(
    ar: Array<T>,
    int: number,
): NlognElement<T> {
    /**
     * Step: Define Recursive Function
     * Step: Guard against empty arrays
     * Step: If the array is a singleton, return it (not an array) tagged as atomic
     * Step: otherwise, spread the array out, then call recursively on each subarray
     * Step: tag the outermost array as unsorted
     * Step: return the tagged array
     *  */

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

    const r: NlognArray<T> = empty('unsorted')

    for (let i = 0; i < split.length; i++) {
        r.data.push(recursiveTagAndDistribute(split[i], int))
    }

    return r
}
