import type { JSX } from 'vue/jsx-runtime'
import type { SortAtom } from './sorting'

export interface Atom<Data> {
    data: Data
    render: () => JSX.Element
}

// TODO: create a "atoms to renderables" function. Goal: take in ar:Array<Atom<T>> and return <Array<SortAtom<Atom<T>>>>
function atomsToRenderables<T>(ar: Array<Atom<T>>): Array<SortAtom<Atom<T>>> {
    return ar.map((atom) => tagAtomic(atom))
}

// TODO: Better idea:
// Make a function that takes an array of data:T, a render function and returns the array A:<Array<SortAtom<Atom<T>>>>. mapping against index, not just using index as the data.

export function dataToAtom<DataType>(
    data: DataType,
    renderfunction: (data: DataType) => JSX.Element,
): Atom<DataType> {
    return { data, render: () => renderfunction(data) }
}

export function dataArrayToAtoms<DataType>(
    data: Array<DataType>,
    renderfunction: (data: DataType) => JSX.Element,
): Array<Atom<DataType>> {
    return data.map((d) => dataToAtom(d, renderfunction))
}

export function dataArrayToRenderAtoms<DataType>(
    data: Array<DataType>,
    renderfunction: (data: DataType) => JSX.Element,
): Array<SortAtom<Atom<DataType>>> {
    return atomsToRenderables(dataArrayToAtoms(data, renderfunction))
}

export function rederFunctionToEmptyAtom<DataType>(
    emptyRenderfunction: () => JSX.Element,
): SortAtom<Atom<DataType>> {
    return tagAtomic({
        data: {} as DataType,
        render: () => emptyRenderfunction(),
    })
}
// TODO: move these functions out of the typefile
