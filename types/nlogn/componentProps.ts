import type { JSX } from 'vue/jsx-runtime'
import type { Atom, NlognElement, SortedArray } from './dataStruct'
import type {
    ElementRenderFunction,
    RenderData,
    RenderDefault,
    RenderWithShape,
    RenderWithShape_Default,
} from '../layout/rendering'
import type { xy } from '../layout/grid'

interface NlognProps_Settings {
    // Note the use of false-assumed values
    dontRenderResultsPile?: boolean
    dontAllowUndo?: boolean
    dontRenderWithIndex?: boolean
}

export interface NlognProps_Base<DataId> {
    dataRenderFunction: RenderData<DataId>
    defaultRenderFunction: RenderDefault
}

// interfaces for component props
export interface NlognProps_CompareBase<DataId>
    extends NlognProps_Base<DataId> {
    grid: xy
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
// =============================================================================
// Recursive component props
// =============================================================================
// TODO: split by logic: i.e. if user inputs an array, then this needs to be split, if they input a data then there is already things that can be used.
export interface NlognProps_Recursive_base<DataId> {
    inPiles: Array<NlognElement<DataId>>
    // TODO: add in settings
}

export interface NlogNProps_Recursive_Inner<DataId>
    extends NlognProps_Recursive_base<DataId> {
    mode: 'inner'
    grid: xy
    defaultRenderFunction: RenderWithShape_Default
    dataRenderFunction: RenderWithShape<DataId>
}

export interface NlogNProps_Recursive_Outer<DataId>
    extends NlognProps_Recursive_base<DataId> {
    mode: 'outer'
    grid: xy
    defaultRenderFunction: RenderWithShape_Default
    dataRenderFunction: RenderWithShape<DataId>
}

export interface NlogNProps_Recursive_Grid<DataId>
    extends NlognProps_Recursive_base<DataId> {
    mode: 'grid'
    dataRenderFunction: RenderData<DataId>
    defaultRenderFunction: RenderDefault
}

export interface NlogNProps_Recursive_Exact<DataId>
    extends NlognProps_Recursive_base<DataId> {
    mode: 'exact'
    grid: xy
    dataRenderFunction: RenderData<DataId>
    defaultRenderFunction: RenderDefault
}

export type NlogNProps_Recursive<DataId> =
    | NlogNProps_Recursive_Inner<DataId>
    | NlogNProps_Recursive_Outer<DataId>
    | NlogNProps_Recursive_Grid<DataId>
    | NlogNProps_Recursive_Exact<DataId>
