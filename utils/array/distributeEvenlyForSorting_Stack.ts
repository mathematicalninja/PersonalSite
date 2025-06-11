import {
    isAtom,
    isAtomicArray,
    recursive_unsortedConst,
    tagAtomic,
    unsorted_ArrayConst,
    type ARRAY_STATE,
    type Atom,
    type AtomicArray,
    type NlognElement,
    type NlognElement_Recursive,
    type RECURSIVE_STATE,
    type RECURSIVE_STATE_UNSORTED,
} from '~/types/nlogn/dataStruct'

/**
 * Use this ONLY at the ground state of recursion.
 * @param arr The array containing would be atoms
 * @param state the state the array is to be returned in defaults to 'unsorted'
 * @returns an array of atoms, in the state specified
 */
export function declareArrayAtomic<T>(
    arr: Array<T>,
    state: ARRAY_STATE = unsorted_ArrayConst,
): AtomicArray<T> {
    return {
        state: state,
        data: arr.map((element) => tagAtomic(element)),
    }
}

/**
 * Create a dummy AtomicArray with no data
 * @param state RECURSIVE_STATE
 * @returns empty AtomicArray with the state set
 */
function empty<T>(state: RECURSIVE_STATE): NlognElement_Recursive<T> {
    return { data: [], state: state }
}

/**
 *
 * @param arr the array being split
 * @param pileCap the number of piles to split into
 * @returns
 */
export function singleSplit<T>(
    arr: Array<NlognElement<T>>,
    pileCap: number,
): Array<NlognElement<T>> {
    if (arr.length <= pileCap) {
        //edge case, shouldn't be reached in practice
        return arr
    }

    const placeholder: Array<Array<NlognElement<T>>> = Array.from(
        { length: pileCap },
        () => [],
    )
    const r = [] as Array<NlognElement<T>>
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        // note the  index % pileCap, this "mixes" the elements somewhat. In Quicksort, the worst case is when the piles are already sorted, so this can help with that without actually randomising the data.
        placeholder[index % pileCap].push(element)
    }
    for (let i = 0; i < placeholder.length; i++) {
        if (placeholder[i].length === 0) {
            placeholder.splice(i, 1)
            i-- // adjust index after splice
            continue
        }
        if (placeholder[i].length === 1) {
            r.push(placeholder[i][0])
            continue
        }
        // placeholder[i] is an actual array. If it's below the split size, we can check if it's an atomic array then tag it and pass it up. Otherwise, we need to tag that it still needs to be split.
        if (placeholder[i].length <= pileCap) {
            // if placeholder[i] is an atomic array
            if (placeholder[i].reduce((acc, el) => acc && isAtom(el), true)) {
                r.push(
                    declareArrayAtomic(
                        placeholder[i].map(
                            (el) => el.data as T, // As the array is atomic, we can pull up the atoms into this declaration about placeholder[i] as atomicArray
                        ),
                    ),
                )
                continue
            }
            // placeholder[i] is not an atomic array, so we need to tag it as recursive unsorted.
            r.push({
                state: recursive_unsortedConst,
                data: placeholder[i],
            } as NlognElement_Recursive<T>)
        }
    }
    return r
}

export function distributeEvenlyForSorting_Stack<T>(
    arr: Array<T>,
    splitSize: number,
): NlognElement<T> {
    // idea: start with the array, split it into piles, each tagged recursiveUnsorted.
    // Move across the array, "digging" into each pile, splitting where necessary, tagging final piles as unsorted atomic arrays.
    // Process: create a pointer that identifies which pile is currently being looked at, then call a (non-recursive) function on that pile, advancing the state by a single state. Then advance the pointer.
    // Note: tagging piles is fiddly, as is moving the pointer.
    // Initial step of tagging the whole array as atoms is needed to keep types across the process, and allow (element.state === X) checks to be carried out.
    const initialArray: AtomicArray<T> = declareArrayAtomic<T>(arr)
    if ((initialArray.data.length = 1)) {
        // If the array has only one element, we can return it as an atomic array.
        let piles: Atom<T> = initialArray.data[0]
        return piles
    }

    if (shorterThan({ element: initialArray, splitSize })) {
        // The pile is already small enough, we can just return it.
        let piles: AtomicArray<T> = {
            state: unsorted_ArrayConst,
            data: initialArray.data,
        }
        return piles
    }

    // Method: create a stack (array) containing all unprocessed piles, mutate them in place, check if they are "properly" tagged, if they are remove them, else move their children will be added to the stack, and they can be moved to.
    const stack: Array<AtomicArray<T>> = [initialArray]

    let piles = initialArray as NlognElement<T>
    piles.state = recursive_unsortedConst // Tag the initial array as recursive unsorted.

    while (stack.length > 0) {
        const currentElement = stack.pop()
        // if(isAtom){continue}
        // if(isAtomicArray && length<= splitSize){continue}
        // if(isSorted){continue}
        // mark unsorted.
        // split data, mutate data to be the new split piles.
        // push children to stack.
        // continue
        if (currentElement === undefined) {
            // Guarding agains .ts nonsense
            // If the current element is undefined, so the stack is empty.
            break
        }

        if (isAtom(currentElement)) {
            // Single atoms are removed and not added to the stack.
            continue
        }

        if (shorterThan({ element: currentElement, splitSize })) {
            // The current element is shore enough that it doesn't need to be mutated into shorter piles.
            // it's already tagged as an unsorted atomic array (during parsePile on its parent) and its already been removed from the stack so we can just move on.
            continue
        }

        // Here we have an element that is too long to be sorted by the user, so we parse it into smaller piles, tag this as recursive unsorted, and push the children (tagged atomicArrays/Atoms) to the stack.
        const children = parsePile({
            element: currentElement,
            splitSize: splitSize,
        })
        for (const child of children) {
        }
    }
    return piles
}
function parsePile<T>({
    element,
    splitSize,
}: {
    element: AtomicArray<T>
    splitSize: number
}):
    | { state: RECURSIVE_STATE_UNSORTED; data: Array<AtomicArray<T>> }
    | AtomicArray<T> {
    if (shorterThan({ element, splitSize })) {
        //edge case, shouldn't be reached in practice
        return element
    }

    // const r: Array<Array<T>> = Array.from({ length: splitSize }, () => [])
    // for (let index = 0; index < element.data.length; index++) {
    //     const e = element.data[index]
    //     r[index % splitSize].push(e)
    // }
    return {
        state: recursive_unsortedConst,
        data: singleSplit_ATOMS({ element: element.data, splitSize }),
    }
}

function shorterThan<T>({
    element,
    splitSize,
}: {
    element: NlognElement<T>
    splitSize: number
}): boolean {
    if (isAtom(element)) {
        return true // Atoms are always shorter than any split size.
    }
    return element.data.length <= splitSize
}
function correctlyTagElement<T>(element: NlognElement<T>): NlognElement<T> {
    if (isAtom(element)) {
        return element
    }
    if (isAtomicArray(element)) {
        element.state = unsorted_ArrayConst
        return element
    }
    // if not an atom or atomic array, it must be a recursive element.
    element.state = recursive_unsortedConst
    return element
}

function updateElement<T>({
    element,
    data,
}: {
    element: NlognElement<T>
    data: NlognElement<T> | T
}): NlognElement<T> {
    const placeholder = { state: element.state, data: data } as NlognElement<T>
    correctlyTagElement(placeholder)
    element.data = placeholder.data
    element.state = placeholder.state
    return element
}

/**
 *
 * @param element the array being split
 * @param splitSize the number of piles to split into
 * @returns
 */
export function singleSplit_ATOMS<T>({
    element,
    splitSize,
}: {
    element: Array<Atom<T>>
    splitSize: number
}): Array<NlognElement<T>> {
    if (element.length <= splitSize) {
        //edge case, shouldn't be reached in practice
        return element
    }

    const placeholder: Array<Array<NlognElement<T>>> = Array.from(
        { length: splitSize },
        () => [],
    )
    const r = [] as Array<NlognElement<T>>
    for (let index = 0; index < element.length; index++) {
        const e = element[index]
        // note the  index % pileCap, this "mixes" the elements somewhat. In Quicksort, the worst case is when the piles are already sorted, so this can help with that without actually randomising the data.
        placeholder[index % splitSize].push(e)
    }
    for (let i = 0; i < placeholder.length; i++) {
        if (placeholder[i].length === 0) {
            placeholder.splice(i, 1)
            i-- // adjust index after splice
            continue
        }
        if (placeholder[i].length === 1) {
            r.push(placeholder[i][0])
            continue
        }
        // placeholder[i] is an actual array. If it's below the split size, we can check if it's an atomic array then tag it and pass it up. Otherwise, we need to tag that it still needs to be split.
        if (placeholder[i].length <= splitSize) {
            // if placeholder[i] is an atomic array
            if (placeholder[i].reduce((acc, el) => acc && isAtom(el), true)) {
                r.push(
                    declareArrayAtomic(
                        placeholder[i].map(
                            (el) => el.data as T, // As the array is atomic, we can pull up the atoms into this declaration about placeholder[i] as atomicArray
                        ),
                    ),
                )
                continue
            }
            // placeholder[i] is not an atomic array, so we need to tag it as recursive unsorted.
            r.push({
                state: recursive_unsortedConst,
                data: placeholder[i],
            } as NlognElement_Recursive<T>)
        }
    }
    return r
}
