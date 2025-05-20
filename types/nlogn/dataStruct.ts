// This file is meant to take the data structures and generate the appropriate types.
// Specifically, it's meant to take the data types for the nlogn sorting methods.

//---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * 'atom' is used for primative data elements.
 */
type ATOM = 'atom'
const atomConst: ATOM = 'atom'

export type SORTED = 'sorted'
export const sortedConst: SORTED = 'sorted'
export type UNSORTED = 'unsorted'
export const unsortedConst: UNSORTED = 'unsorted'
/**
 * partial is for when the array was "abandoned" in the middle of sorting
 */
export type PARTIAL = 'partial'
/**
 * partial is for when the array was "abandoned" in the middle of sorting
 */
export const partialConst: PARTIAL = 'partial'
/**
 * midSort is for when the array is in the middle of sorting
 */
export type MIDSORT = 'midSort'
/**
 * midSort is for when the array is in the middle of sorting
 */
export const midSortConst: MIDSORT = 'midSort'
/**
 * partial is for when the array was "abandoned" in the middle of sorting
 *
 * midSort is for when the array is in the middle of sorting
 */
export type ARRAY_STATE = SORTED | UNSORTED | PARTIAL | MIDSORT
// TODO: add in a state for "I don't care about all elements after this point"
// maybe SEMI_SORTED or something like that?

/**
 * Current state of an NlognElement.
 */
export type SortState = ARRAY_STATE | ATOM

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

export function isAtom<T>(arr: NlognElement<T>): arr is Atom<T> {
    // Note that if typeof arr = T, then arr.state will be undefined
    return arr.state === atomConst
}

// ---------------------------------------------------------------------------
// Recursive Elements
// ---------------------------------------------------------------------------

export type NlognElement<T> = Atom<T> | NlognArray<T>

// ---------------------------------------------------------------------------
// Recursive Arrays
// ---------------------------------------------------------------------------

/**
 * Recursive type, ground state: **NlognAtom**, Layers of **NlognElement**s
 */
export type NlognArray<T> = {
    state: ARRAY_STATE
    data: Array<NlognElement<T>>
}
export function isNlognArray<T>(arr: NlognElement<T>): arr is NlognArray<T> {
    // note that ar.state == undefined ---> return false
    return arr.state !== atomConst
}

// ---------------------------------------------------------------------------
// non-Recursive Elemets
// ---------------------------------------------------------------------------

/**
 * an NlognArray whose data is an array of **Atom**s.
 */
export type NlognArray_Atoms<T> = {
    state: ARRAY_STATE
    data: Array<Atom<T>>
}
export function isArrayOf_NlognElement_Atom<T>(
    ar: Array<NlognElement<T>>,
): ar is Array<Atom<T>> {
    return ar.every((element) => {
        return isAtom(element)
    })
}
/**
 *
 * @param data an array of data to be tagged as an NlognArray_Atoms.
 * @returns Array<Atom<T>>.
 */
export function tagArrayAtomic<T>(data: Array<T>): NlognArray_Atoms<T> {
    return { state: unsortedConst, data: data.map((d) => tagAtomic(d)) }
}

/**
 * an NlognArray whose data is **sorted**.
 */
export type SortedArray<T> = { state: 'sorted'; data: Array<Atom<T>> }
export function isSorted<T>(ar: NlognElement<T>): ar is SortedArray<T> {
    return ar.state === sortedConst
}

export function isArrayOf_NlognElement_Sorted<T>(
    ar: Array<NlognArray<T> | Atom<T>>,
): ar is Array<SortedArray<T>> {
    return ar.every((element) => {
        return isSorted(element)
    })
}

/**
 * an NlognArray whose data is **non-recursive**.
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
// Full type ==> the reason for all this.
// ---------------------------------------------------------------------------
/**
 * a (possibly recursive) element (or array) of dataType.
 */
export type fullSortElement<dataType> =
    //Non-recursive piles
    | Atom<dataType>
    | SortedArray<dataType>
    | Array<SortedArray<dataType> | Atom<dataType>>
    // possibly recursive piles
    | NlognElement<dataType>

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

// type RenderableNlognArrayOrAtom =
//     | NlognAtom<Atom<any>>
//     | NlognArray<NlognAtom<Atom<any>>>

// export interface Atom<Data> {
//     data: Data
//     render: () => JSX.Element
// }

// export type RenderableNlognArrayOrAtom<T> =
//     | NlognAtom<Atom<T>>
//     | NlognArray<Atom<T>>

// export type nonRecursiveNlognArray<T> = {
//     state: NlognArrayState
//     data: Array<NlognAtom<Atom<T>> | NlognArrayAtoms<Atom<T>>>
// }

// export function areAllPilesAtoms<T>(
//     piles: Array<RenderableNlognArrayOrAtom<T>>,
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
//     piles: Array<RenderableNlognArrayOrAtom<T>>,
// ): piles is Array<NlognArray<Atom<T>>> {
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
