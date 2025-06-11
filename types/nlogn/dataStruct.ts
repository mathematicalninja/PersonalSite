// This file is meant to take the data structures and generate the appropriate types.
// Specifically, it's meant to take the data types for the nlogn sorting methods.

//---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Atoms: the building blocks of the universe.
// ---------------------------------------------------------------------------

/**
 * 'atom' is used for primative data elements.
 */
type ATOM = 'atom'
const atomConst: ATOM = 'atom'

// ---------------------------------------------------------------------------
// "Arrays": Built only out of Atoms.
// ---------------------------------------------------------------------------

export type SORTED = 'sorted'
export const sorted_ArrayConst: SORTED = 'sorted'
export type UNSORTED = 'unsorted'
export const unsorted_ArrayConst: UNSORTED = 'unsorted'

export type ARRAY_STATE = SORTED | UNSORTED

// ---------------------------------------------------------------------------
// Recursive Structures: Built out of themselves, Atoms, or their Arrays.
// ---------------------------------------------------------------------------

/**The data is **not** an Array of atoms, nor an Atom.   Used for unprocessed data structs.*/
export type RECURSIVE_STATE_UNSORTED = 'recursive_unsorted'
/**The data is **not** an Array of atoms, nor an Atom.   Used for unprocessed data structs.*/
export const recursive_unsortedConst: RECURSIVE_STATE_UNSORTED =
    'recursive_unsorted'

/**
 * partial is for an **"array"** that was "abandoned" in the middle of sorting.
 */
export type RECURSIVE_STATE_PARTIAL = 'partial'
/**
 * partial is for an **"array"** that was "abandoned" in the middle of sorting.
 */
export const partial_unsortedConst: RECURSIVE_STATE_PARTIAL = 'partial'
/**
 * midSort is for an **array** that is in the middle of sorting.
 */
export type RECURSIVE_STATE_MIDSORT = 'midSort'
/**
 * midSort is for an **array** that is in the middle of sorting.
 */
export const midSort_unsortedConst: RECURSIVE_STATE_MIDSORT = 'midSort'

/**The data is **not** an Array of atoms, nor an Atom. */
export type RECURSIVE_STATE =
    | RECURSIVE_STATE_UNSORTED
    | RECURSIVE_STATE_PARTIAL
    | RECURSIVE_STATE_MIDSORT

// ---------------------------------------------------------------------------
// Union Types: For when we don't know what we're looking at.
// ---------------------------------------------------------------------------

/**
 * Current state of an NlognElement.
 */
export type SortState = RECURSIVE_STATE | ARRAY_STATE | ATOM

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

/**
 *  The most primative object used to store some data.
 */
export type Atom<T> = {
    state: ATOM
    data: T
}
/**
 * takes a primative piece of data and wraps it as an Atom.
 * @param data anything
 */
export function tagAtomic<T>(data: T): Atom<T> {
    // Note this function is defined here to avoid 'ATOM' and 'atomConst' being exported and available for misuse outside of this file.
    return { state: atomConst, data: data }
}

export function isAtom<T>(element: NlognElement<T> | T): element is Atom<T> {
    // Note that if typeof element = T, then arr.state will be undefined and this returns false.
    if (typeof element !== 'object' || element === null) {
        return false
    }
    if (!('state' in element)) {
        return false
    }

    return element.state === atomConst
}

// ---------------------------------------------------------------------------
// Non-Recursive Arrays
// ---------------------------------------------------------------------------

/**
 * Recursive type, ground state: **NlognAtom**, Layers of **NlognElement**s
 */
export type AtomicArray<T> = {
    state: ARRAY_STATE
    data: Array<Atom<T>>
}
/**
 * Check if a nlognElement has only Atoms as its data.
 */
export function isAtomicArray<T>(
    element: NlognElement<T>,
): element is AtomicArray<T> {
    // note that ar.state == undefined ---> return false
    if (
        element.state === sorted_ArrayConst ||
        element.state === unsorted_ArrayConst
    ) {
        return true
    }
    return false
}
/**
 * Checks if an **array** has Atoms as its elements.
 */
export function isArrayOf_NlognElement_Atom<T>(
    ar: Array<NlognElement<T>> | Array<T>,
): ar is Array<Atom<T>> {
    return ar.every((element) => {
        return isAtom(element)
    })
}
/**
 *
 * @param data an array of data to be tagged as an AtomicArray.
 * @returns AtomicArray<T> - unsorted
 */
export function tagArrayAtomic<T>(data: Array<T>): AtomicArray<T> {
    return { state: unsorted_ArrayConst, data: data.map((d) => tagAtomic(d)) }
}

/**
 * an AtomicArray whose data is **sorted**.
 */
export type SortedArray<T> = { state: SORTED; data: Array<Atom<T>> }
export function isSorted<T>(ar: NlognElement<T>): ar is SortedArray<T> {
    return ar.state === sorted_ArrayConst
}

export function isArrayOf_NlognElement_Sorted<T>(
    ar: Array<AtomicArray<T> | Atom<T>>,
): ar is Array<SortedArray<T>> {
    return ar.every((element) => {
        return isSorted(element)
    })
}

/**
 * an AtomicArray whose data is **non-recursive**.
 */
export type NlognElement_Renderable<T> = Atom<T> | SortedArray<T>

export function isArrayOf_NlognElement_Renderable<T>(
    ar: Array<NlognElement<T>>,
): ar is Array<NlognElement_Renderable<T>> {
    for (let element of ar) {
        if (!(isAtom(element) || isSorted(element))) {
            return false
        }
    }

    return true
}

export type renderableSortPile<T> =
    | Array<Atom<T>>
    | Array<SortedArray<T>>
    | Array<Atom<T> | SortedArray<T>>

// ---------------------------------------------------------------------------
// Recursive Elements
// ---------------------------------------------------------------------------

export type NlognElement_Recursive<T> = {
    state: RECURSIVE_STATE
    data: Array<Atom<T> | AtomicArray<T> | NlognElement_Recursive<T>>
}
export type NlognElement<T> =
    | Atom<T>
    | AtomicArray<T>
    | NlognElement_Recursive<T>

export function isNlogN_Element<T>(
    element: NlognElement<T> | T,
): element is NlognElement<T> {
    // Note that if typeof element = T, then arr.state will be undefined and this returns false.
    if (typeof element !== 'object' || element === null) {
        return false
    }
    if (!('state' in element) || !('data' in element)) {
        return false
    }

    if (
        element.state === atomConst ||
        //
        element.state === sorted_ArrayConst ||
        element.state === unsorted_ArrayConst ||
        //
        element.state === recursive_unsortedConst ||
        element.state === partial_unsortedConst ||
        element.state === midSort_unsortedConst
    ) {
        return true
    }
    return false
}

export function isArrayOf_NlognElement<T>(
    ar: Array<NlognElement<T> | T>,
): ar is Array<NlognElement<T>> {
    return ar.every((element) => {
        return isNlogN_Element(element)
    })
}
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================
// ===========================================================================

// ---------------------------------------------------------------------------
// Legacy code
// ---------------------------------------------------------------------------

// type RenderableAtomicArrayOrAtom =
//     | NlognAtom<Atom<any>>
//     | AtomicArray<NlognAtom<Atom<any>>>

// export interface Atom<Data> {
//     data: Data
//     render: () => JSX.Element
// }

// export type RenderableAtomicArrayOrAtom<T> =
//     | NlognAtom<Atom<T>>
//     | AtomicArray<Atom<T>>

// export type nonRecursiveAtomicArray<T> = {
//     state: AtomicArrayState
//     data: Array<NlognAtom<Atom<T>> | AtomicArrayAtoms<Atom<T>>>
// }

// export function areAllPilesAtoms<T>(
//     piles: Array<RenderableAtomicArrayOrAtom<T>>,
// ): piles is Array<NlognAtom<Atom<T>>> {
//     for (let i = 0; i < piles.length; i++) {
//         const p = piles[i]
//         if (!p) {
//             return false // error
//         }
//         if (!(p.state == 'atom')) {
//             return false
//         }
//     }
//     return true
// }

// export function noAtomsInPiles<T>(
//     piles: Array<RenderableAtomicArrayOrAtom<T>>,
// ): piles is Array<AtomicArray<Atom<T>>> {
//     for (let i = 0; i < piles.length; i++) {
//         const p = piles[i]
//         if (!p) {
//             return false // error
//         }
//         if (p.state == 'atom') {
//             return false
//         }
//     }
//     return true
// }
