export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

/**
 * partial is for when the array was "abandoned" in the middle of sorting
 *
 * midSort is for when the array is in the middle of sorting
 */
export type SortArrayState = 'sorted' | 'partial' | 'unsorted' | 'midSort'

export type SortAtomState = 'atom'

export type SortAtom<T> = {
    state: SortAtomState
    data: T
}
// An array of tagged atoms.
export type AtomicArray<T> = Array<SortAtom<T>>

/**
 * This should never be used outside these typeGuards, as elements should never be tagged as anything other than atoms
 */
type SortElement<T> = {
    state: SortState
    data: T | RecursiveSortArray<T>
}

export function isAtom<T>(arr: SortElement<T>): arr is SortAtom<T> {
    return arr.state === 'atom' // Note that if typeof arr = T, then arr.state will be undefined
}

/**
 *
 * @param arr to be checked
 * @returns if the array (possible of lenth 1) only contains atoms
 */
export function isAtomicArray<T>(
    arr: RecursiveSortArray<T>,
): arr is AtomicArray<T> {
    if (arr.length === 0) {
        return false
    }
    return arr.every((e) => isAtom(e))
}

export type RecursiveSortArray<T> = Array<
    //   Just an element
    | SortAtom<T>
    | {
          //Full recursive array
          state: SortState
          data: RecursiveSortArray<T>
      }
>

/**
 * Usage:
 * var A: RecursiveSortArray<T> = ...
 *
 * A.state => 'sorted' | 'partial' | 'unsorted' | 'atom'
 *
 * if (isAtom(A)) {
 *      A.data => T
 * }
 * else {
 *      A.state => 'sorted' | 'partial' | 'unsorted'
 *      A.data => Array<InnerRecusiveSortArray<T>>
 * }
 *
 */

export type InnerRecusiveSortArray<T> =
    | SortAtom<T>
    | {
          state: SortArrayState
          data: Array<InnerRecusiveSortArray<T>>
      }
