import type { Atom } from './atom'

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

export function isAtom<T>(arr: RecursiveSortElement<T>): arr is SortAtom<T> {
    return arr.state === 'atom' // Note that if typeof arr = T, then arr.state will be undefined
}

export type SortArray<T> = {
    state: SortArrayState
    data: Array<RecursiveSortElement<T>>
}

/**
 * Recursive type, ground state: SortAtom, Layers of SortArray
 */
export type RecursiveSortElement<T> = SortAtom<T> | SortArray<T>

export function isSortArray<T>(
    arr: RecursiveSortElement<T>,
): arr is SortArray<T> {
    return arr.state !== 'atom'
}

export type SortArrayAtoms<T> = {
    state: SortArrayState
    data: AtomicArray<T>
}

export type RenderableSortArrayOrAtom<T> =
    | SortAtom<Atom<T>>
    | SortArray<Atom<T>>

/**
 * An **array** of tagged atoms.
 */
export type AtomicArray<T> = Array<SortAtom<T>>

export type nonRecursiveSortArray<T> = {
    state: SortArrayState
    data: Array<SortAtom<Atom<T>> | SortArrayAtoms<Atom<T>>>
}

export type AtomOrSortedArray<T> =
    | SortAtom<T>
    | {
          state: 'sorted'
          data: Array<SortAtom<T>>
      }

export function isSorted<T>(ar: RecursiveSortElement<T>): ar is SortedArray<T> {
    return ar.state === 'sorted'
}

export function isArrayOfAtomOrSortArray<T>(
    ar: Array<RecursiveSortElement<T>>,
): ar is Array<AtomOrSortedArray<T>> {
    for (let element of ar) {
        if (!(isAtom(element) || isSortArray(element))) {
            return false
        }
    }

    return true
}

export function areAllPilesAtoms<T>(
    piles: Array<RenderableSortArrayOrAtom<T>>,
): piles is Array<SortAtom<Atom<T>>> {
    for (let i = 0; i < piles.length; i++) {
        const p = piles[i]
        if (!p) {
            return false // error
        }
        if (!(p.state == 'atom')) {
            return false
        }
    }
    return true
}

export function noAtomsInPiles<T>(
    piles: Array<RenderableSortArrayOrAtom<T>>,
): piles is Array<SortArray<Atom<T>>> {
    for (let i = 0; i < piles.length; i++) {
        const p = piles[i]
        if (!p) {
            return false // error
        }
        if (p.state == 'atom') {
            return false
        }
    }
    return true
}

export type SortedArray<T> = { state: 'sorted'; data: Array<SortAtom<T>> }

export function AreAllSorted<T>(
    ar: Array<SortArray<T> | SortAtom<T>>,
): ar is Array<SortedArray<T>> {
    return ar.every((p) => {
        return !isAtom(p) && isSorted(p)
    })
}

export function areAllSortedOrAtoms<T>(ar: Array<SortArray<T> | SortAtom<T>>) {
    for (let element of ar) {
        if (!(element.state == 'atom' || element.state == 'sorted')) {
            return false
        }
    }
    return true
}
