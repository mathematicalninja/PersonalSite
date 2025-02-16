import type { NestedArray } from '~/types/NestedArray'
import {
    type SortState,
    type SortAtom,
    type RecursiveSortArray,
    type AtomicArray,
    isAtom,
    isAtomicArray,
} from '~/types/sorting'

export function distributeEvenly<T>(
    ar: Array<T>,
    int: number,
): Array<Array<T>> {
    /* Idea:
   "deal" elements from the start of the array into 'int' many piles, as evenly as possible
   */
    const A = structuredClone(ar)
    const r: Array<Array<T>> = Array.from({ length: int }, () => [])

    // If the array is empty, return an empty array

    if (A.length <= 1) {
        return [A]
    }

    // If the array is smaller than the number of piles, return an array of arrays with one element each

    if (A.length <= int) {
        return A.map((e) => [e])
    }

    // If the array is larger than the number of piles, distribute the elements as evenly as possible

    for (let i = 0; A.length != 0; i++) {
        let a = A.shift()
        if (!a) {
            break
        }
        r[i % int].push(a)
    }
    return r
}
export function recursiveDistribute<T>(
    ar: Array<T>,
    int: number,
): NestedArray<T> {
    const r = distributeEvenly(ar, int)
    if (r.length === 1) {
        return r[0]
    }
    return r.map((e) => recursiveDistribute(e, int))
}

function tagAtomic<T>(element: T): SortAtom<T> {
    return { state: 'atom', data: element }
}

function tagArray<T>(
    arr: RecursiveSortArray<T>,
    state: SortState,
): RecursiveSortArray<T> {
    if (isAtom(arr)) {
        return arr
    }
    return { state, data: arr.data }
}

function tagUnsorted<T>(arr: RecursiveSortArray<T>): RecursiveSortArray<T> {
    return tagArray(arr, 'unsorted')
}
