/**
 * partial is for when the array was "abandoned" in the middle of sorting
 *
 * midSort is for when the array is in the middle of sorting
 */
export type SortState = 'sorted' | 'partial' | 'unsorted' | 'atom'

export type SortAtomState = 'atom'

/**
 * partial is for when the array was "abandoned" in the middle of sorting
 *
 * midSort is for when the array is in the middle of sorting
 */
export type SortArrayState = 'sorted' | 'partial' | 'unsorted' | 'midSort'

export type SortAtom<T> = {
    state: SortAtomState
    data: T
}

export function isAtom<T>(arr: RecusiveSortArray<T>): arr is SortAtom<T> {
    return arr.state === 'atom' // Note that if typeof arr = T, then arr.state will be undefined
}

export type SortArray<T> = {
    state: SortArrayState
    data: Array<RecusiveSortArray<T>>
}

export function isSortArray<T>(arr: RecusiveSortArray<T>): arr is SortArray<T> {
    return arr.state !== 'atom'
}

export type SortArrayAtoms<T> = {
    state: SortArrayState
    data: AtomicArray<T>
}

/**
 * An **array** of tagged atoms.
 */
export type AtomicArray<T> = Array<SortAtom<T>>

/**
 * Recursive type, ground state: SortAtom, Layers of SortArray
 */
export type RecursiveSortArray<T> = SortAtom<T> | SortArray<T>
