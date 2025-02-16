export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type RecursiveSortArray<T> =
    | {
          //Full recursive array
          state: SortState
          data: Array<RecursiveSortArray<T>>
      }
          // Final array level
    | SortArray<T>
    //   Just an element
    | SortAtom<T>

export type SortAtom<T> = {
    state: 'atom'
    data: T
}

export type SortArray<T> = {
    state: SortState
    data: Array<T>
}
