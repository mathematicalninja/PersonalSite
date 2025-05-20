import type { JSX } from 'vue/jsx-runtime'
/**
 * list of datatypes that Factories have been set up for.
 */
export type DataTypeEnum =
    // rendering an int in a box for demo purposes
    | 'int'
    // "Full" pokemon data
    // | 'pkmn'
    // simply for nationalNum => JSX.Element rendering
    | 'pkmnNumCard'

// Generic factory function takes in an enum type and produces a factory specific to that type.
export type genericDataFactory<DataID, DataType> = (
    dataName: DataTypeEnum,
) => (DataId: DataID) => DataType
// Specific factories take in data indexes or data keys and produce give back the data needed to interface with the rest of the codebase.

// generic Factory that could take in any dataType and return a render function for that data type.
export type genericRenderFactory<DataType> = (
    dataName: DataTypeEnum,
) => (data: DataType) => JSX.Element
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// Example usage
// -----------------------------------------------------------------------------
// e.g. intFactory:
export type IntFactory_Render = (
    dataType: 'int',
) => (data: number) => JSX.Element
export type IntFactory_Data = (dataType: 'int') => (data: number) => number

// function fullFactory(dataType: DataTypeEnum) {
//     // integer render factory
//     if (dataType == 'int') {
//         return (data: number) => {
//             return <div>{data}</div>
//         }
//     }

//     // "null" factory
//     return (data: any) => {
//         return <span />
//     }
// }
