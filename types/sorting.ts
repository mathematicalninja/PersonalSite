export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type SortAtom<T> = {
    state: 'atom'
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
    return arr.state === 'atom'
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
