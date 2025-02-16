export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type RecursiveSortArray<T> =
    | {
          //Full recursive array
          state: SortState
          data: Array<RecursiveSortArray<T>>
      }
    | {
          // Final array level
          state: SortState
          data: Array<T>
      }
    //   Just an element
    | SortAtom<T>
