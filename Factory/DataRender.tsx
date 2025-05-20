import type { JSX } from 'vue/jsx-runtime'
import type {
    DataTypeEnum,
    genericRenderFactory,
} from '~/types/component/factories'
import type { RenderById, RenderData } from '~/types/layout/rendering'
import type { Atom } from '~/types/nlogn/dataStruct'

export function getRenderFunction<DataType>(
    dataName: DataTypeEnum,
): RenderData<DataType> {
    // TODO: put typechecks against dataType to align everything.
    switch (dataName) {
        case 'int':
            throw new Error('Int not implemented')
        // return integerFactory
        // case 'pkmn':
        //     return (pokeNumber: pokeNumber) => <PkmnDexCard pokeNumber={pokeNumber} />
        case 'pkmnNumCard':
            throw new Error('pkmnNumCard not implemented')
        // return pkmnNumCardFactory
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
// =============================================================================
// =============================================================================
// =============================================================================
// Defunct

function integerFactory(data: Atom<number>): JSX.Element {
    const styled = <div class="border-4 border-green-500">{data.data}</div>
    return styled
    return <span>{data.data}</span>
}

function pkmnNumCardFactory(dexNum: number): JSX.Element {
    return <PkmnDexNumCard dexNum={dexNum} />
}
// =============================================================================
