import {
    unsorted_ArrayConst,
    tagAtomic,
    sorted_ArrayConst,
    isArrayOf_NlognElement,
    recursive_unsortedConst,
    type AtomicArray,
    type ARRAY_STATE,
    type NlognElement,
    type RECURSIVE_STATE,
    type NlognElement_Recursive,
} from '~/types/nlogn/dataStruct'

/**
 * Use this ONLY at the ground state of recursion.
 * @param arr The array containing would be atoms
 * @param state the state the array is to be returned in defaults to 'unsorted'
 * @returns an array of atoms, in the state specified
 */
export function declareArrayAtomic<T>(
    arr: Array<T>,
    state: ARRAY_STATE = unsorted_ArrayConst,
): AtomicArray<T> {
    return {
        state: state,
        data: arr.map((element) => tagAtomic(element)),
    }
}

/**
 * Create a dummy AtomicArray with no data
 * @param state:ARRAY_STATE
 * @returns empty AtomicArray with the state set
 */
function empty<T>(state: RECURSIVE_STATE): NlognElement_Recursive<T> {
    return { data: [], state: state }
}

/**
 *
 * @param arr the array being split
 * @param pileCap the number of piles to split into
 * @returns
 */
export function singleSplit<T>(
    arr: Array<T>,
    pileCap: number,
): Array<Array<T>> {
    if (arr.length <= pileCap) {
        //edge case, shouldn't be reached in practice
        return arr.map((e) => [e])
    }
    const r: Array<Array<T>> = Array.from({ length: pileCap }, () => [])
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        r[index % pileCap].push(element)
    }
    return r
}

/**
 *
 * @param arr an array of anything
 * @param int the number of "piles" to split it into
 * @returns a recursive array, bottom later tagged atomic, each other layer tagged unsorted.
 */
export function recursiveTagAndDistribute<T>(
    arr: Array<T> | Array<NlognElement<T>>,
    int: number,
): NlognElement<T> {
    /**
     * Summary
     * -------
     * Step: Define Recursive Function
     * Step: Guard against empty arrays
     * Step: Guard against recursive elements (handled below)
     * Step: If the array is a singleton, return it (not an array) tagged as atomic
     * Step: If the array is not marked as atoms, do so.
     * Step: otherwise, spread the array out, then call recursively on each subarray
     * Step: tag the outermost array as unsorted
     * Step: return the tagged array
     *  */

    // Guard against empty arrays
    if (arr.length === 0) {
        return { state: sorted_ArrayConst, data: [] }
    }

    //==========================================================================
    // -------------------------------------------------------------------------
    // we have an array of elements, split this into sub-arrays
    // "sub-arrays" may be ATOMs
    // recur on each sub-array, which will split it if needed.
    // Take the resulting array of aub-arrays and tag it.
    // -------------------------------------------------------------------------
    // If the passed element is an atom, this will be returned as is.
    // If the passed element is a small enough array of Atoms, it will be returned tagged unsorted.
    // If the passed element is a large enough array of Atoms, it will be split into sub-arrays, and each sub-array will be tagged as unsorted.
    // -------------------------------------------------------------------------
    // If we are still in the function at this point, it means that we have already done some recursion, so we need to pass the already tagged children as the data array of this unsorted-recursive element.
    //==========================================================================

    // split: Array<Array<NlognElement<T>>>
    // Return: NlognElement_Recursive<T>

    // Guard against:
    // 1. Atoms
    // ==> return as is.

    // 2. AtomicArrays & NlognElement_Recursive
    // 2b. Check arr.length against int
    // ==> if(short) return {state: recursive_unsortedConst, data: arr}
    // 2c. split needed
    // NewArr = []
    // ==> for subArr in split: call recursive. append to NewArr
    // ==> return {state: recursive_unsortedConst, data: NewArr}

    //==========================================================================
    // New Code
    //==========================================================================

    // 1 - Guard against Atoms
    // Check if any elements are not tagged NlognElements, if so, tag them as atomic
    if (!isArrayOf_NlognElement(arr)) {
        declareArrayAtomic(arr, unsorted_ArrayConst)
        return recursiveTagAndDistribute(arr, int)
    }

    // 2b
    if (arr.length <= int) {
        return { state: recursive_unsortedConst, data: arr }
    }

    // 2c
    // Spread the array out, then call recursively on each subarray
    const split = singleSplit(arr, int)
    const NewArr: Array<NlognElement<T>> = []
    for (let i = 0; i < split.length; i++) {
        const subArray = split[i]
        // Recur on each sub-array
        const recursiveElement = recursiveTagAndDistribute<T>(subArray, int)
        NewArr.push(recursiveElement)
    }
    return { state: recursive_unsortedConst, data: NewArr }
}
