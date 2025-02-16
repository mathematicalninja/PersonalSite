export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type RecursiveSortArray<T> = {
    state: SortState
    data: Array<T | RecursiveSortArray<T>>
}
