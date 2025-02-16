export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type SortAtom<T> = {
    state: 'atom'
    data: T
}

export type SortArray<T> = {
    state: SortState
    data: Array<T>
}

export type RecursiveSortArray<T> =
    //   Just an element
    | SortAtom<T>
    // Final array level
    | SortArray<T>
    | {
          //Full recursive array
          state: SortState
          data: Array<RecursiveSortArray<T>>
      }
