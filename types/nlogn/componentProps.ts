import type { JSX } from 'vue/jsx-runtime'
import type { Atom, SortedArray } from './dataStruct'
import type { ElementRenderFunction, RenderData } from '../layout/rendering'

interface NlognProps_Settings {
    // Note the use of false-assumed values
    dontRenderResultsPile?: boolean
    dontAllowUndo?: boolean
    dontRenderWithIndex?: boolean
}

// interfaces for component props
export interface NlognProps_CompareBase<DataId> {
    grid: xy
    dataRenderFunction: RenderData<DataId>
    defaultRenderFunction: () => JSX.Element
    // TODO: remove
    renderResultsPile?: boolean
    resultsGrid?: { x: number; y?: number }
}
// TODO: if(!resultsGrid) { resultsGrid.x = gridSize.x }

export interface NlognProps_AtomCompare<DataId>
    extends NlognProps_CompareBase<DataId> {
    inPile: Array<Atom<DataId>>
}

export interface NlognProps_PileCompare<DataId>
    extends NlognProps_CompareBase<DataId> {
    inPiles: Array<SortedArray<DataId>>
}

export interface NlognProps_MixCompare<DataId>
    extends NlognProps_CompareBase<DataId> {
    inPiles: Array<SortedArray<DataId> | Atom<DataId>>
}

export interface NlognProps_Results<DataId> {
    renderWithId?: boolean
    resultPile: Array<Atom<DataId>>
    resultsGrid: {
        x: number
        y?: number
    }
    resultRenderFunction: ElementRenderFunction<DataId>
}

// TODO: split by logic: i.e. if user inputs an array, then this needs to be split, if they input a data then there is already things that can be used.
export interface NlognProps_Recursive<DataId>
    extends NlognProps_MixCompare<DataId> {}
