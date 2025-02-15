export type SortState = 'sorted' | 'partial' | 'unsorted'

export type RecursiveSortArray<T> = {
    state: SortState
    data: Array<T | RecursiveSortArray<T>>
}
