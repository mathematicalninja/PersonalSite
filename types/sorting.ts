export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type SortAtom<T> = {
    state: 'atom'
    data: T
}
export function isAtom<T>(arr: RecursiveSortArray<T>): arr is SortAtom<T> {
    return arr.state === 'atom'
}

// An array of tagged atoms.
export type AtomicArray<T> = {
    state: SortState
    data: Array<SortAtom<T>>
}

export function isAtomicArray<T>(
    arr: RecursiveSortArray<T>,
): arr is AtomicArray<T> {
    if (isAtom(arr)) {
        return false
    }
    return arr.data.every((e) => isAtom(e))
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
