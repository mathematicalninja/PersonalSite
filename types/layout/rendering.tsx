import type { JSX } from 'vue/jsx-runtime'
import type { Atom } from '../nlogn/dataStruct'
import type { ElementShape } from './grid'

// =============================================================================
// type DataID is used as an index handler for dataStores to get full element data.
// Data store is used to take IDs and generate atoms of type 'TypeOfData'.
export type DataStore<DataID, TypeOfData> = (key: DataID) => Atom<TypeOfData>

// This is the render function that takes in types data and produces a renderable JSX element.

// =============================================================================

// Used to generate a default element.
export type RenderDefault = () => JSX.Element

// Takes in data and renders that as a JSX element
export type RenderData<TypeOfData> = (data: TypeOfData) => JSX.Element

// Used to render JSX elements for data including some sort of tagged identifier.
export type RenderWithIndex<TypeOfData> = (
    data: TypeOfData,
    idx: number,
) => JSX.Element

// Note that TypeOfData is used as an overload to allow the passing of data id's rather than the data itself.
export type RenderById<TypeOfData> = (idData: TypeOfData) => JSX.Element

// Any possible render function that can take in data, an id of a piece of data or nothing.
/**
 * Renders data of type TypeOfData.
 */
export type RenderFunction<TypeOfData> =
    | ElementRenderFunction<TypeOfData>
    | RenderById<TypeOfData>
    | RenderDefault

// Used for non-empty arrays of results data.
export type ElementRenderFunction<TypeOfData> =
    | RenderData<TypeOfData>
    | RenderWithIndex<TypeOfData>

// =============================================================================
// modifiable render functions
// =============================================================================
export type RenderWithShape<TypeOfData> = (
    data: TypeOfData,
    shape: ElementShape,
) => JSX.Element

export type RenderWithShape_Default = (shape: ElementShape) => JSX.Element

// Note that TypeOfData is used as an overload to allow the passing of data id's rather than the data itself.
export type RenderShape_ById<TypeOfData> = (
    idData: TypeOfData,
    shape: ElementShape,
) => JSX.Element

// -----------------------------------------------------------------------------
// (DataID) --> (TypeOfData) --> JSX.Element
// -----------------------------------------------------------------------------
// This is a combination of the types in factories.tsx and here:
// gData: genericDataById<TypeOfData, DataID> = (idData: DataID) => TypeOfData
// rData: RenderData<TypeOfData> = (data: TypeOfData) => JSX.Element
// then full composition is:
// rData(gData(idData)) = JSX.Element

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// Future implementations.
// -----------------------------------------------------------------------------

// type HTML_key = string

// type DataRenderPair<TypeOfData> = {
//     data: TypeOfData
//     render: RenderData<TypeOfData>
//     key?: HTML_key
// }

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// TODO: #118 cleanup of DataID as a type to allow generics
// Something like
// type DataID = idType<string>
// type DataID = idType<number>
// as a specific implementation used downstream
// This would allow .tsx functions to handle generics. And .vue to choose a DataID type to use.
// export type DataID = string | number
