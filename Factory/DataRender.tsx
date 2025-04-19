import { PkmnDexCard, PkmnDexNumCard } from '#components'
import type { JSX } from 'vue/jsx-runtime'
import type { pokeNumber } from '~/types/pkmn'
import type { RecursiveSortElement, SortAtom } from '~/types/sorting'

export type DataRenderFunction = (data: any) => JSX.Element // Note thaat the use of any here is to prevent cross contamination, as one dataType uses strings to id itself while another uses ints. Splitting the types would be better.
export type idData = string | number
export type DataType =
    | 'int'
    // 'pkmn' |
    | 'pkmnNumCard'

export type idHTML = string

export function getRenderFunction(dataType: DataType): DataRenderFunction {
    // TODO: put typechecks against dataType to align everything.
    switch (dataType) {
        case 'int':
            return integerFactory
        // case 'pkmn':
        //     return (pokeNumber: pokeNumber) => <PkmnDexCard pokeNumber={pokeNumber} />
        case 'pkmnNumCard':
            return pkmnNumCardFactory
        default:
            throw new Error('Unknown data type')
    }
}

//  <ControlLogic
//     :dataStore
//     :dataType
//     :dataStruct
//  />

// Below are some types that are used in dependent code:

type DataRenderProps = {
    data: idData
    render: DataRenderFunction
    key?: idHTML
}

type typeOfData = any

export type DataStore = (key: idData) => SortAtom<typeOfData>

type DataStruct = RecursiveSortElement<DataType>

type renderByIdViaData = (idData: idData) => (data: any) => JSX.Element

export type RenderById = (idData: idData) => JSX.Element

export function renderFactoryByDataType(
    DataType: DataType,
    DataStore: DataStore,
): RenderById {
    const render = getRenderFunction(DataType)
    const rf = (idData: idData) => {
        const data = DataStore(idData)
        return render(data)
    }
    return rf
}

function integerFactory(data: SortAtom<number>): JSX.Element {
    const styled = <div class="border-4 border-green-500">{data.data}</div>
    return styled
    return <span>{data.data}</span>
}

// export function integerFactoryClickable(
//     idData: idData,
//     dataStore: DataStore,
// ): JSX.Element {
//     // TODO: change dataStore ==> dataStore<int>
//     const data = dataStore(idData)
//     const dataInt = data.data
// }

function pkmnNumCardFactory(dexNum: number): JSX.Element {
    return <PkmnDexNumCard dexNum={dexNum} />
}
