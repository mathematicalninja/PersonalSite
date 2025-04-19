import { PkmnDexNumCard } from '#components'
import type { JSX } from 'vue/jsx-runtime'
import type { DataStore, RenderById } from './DataRender'
import type { SortAtom } from '~/types/sorting'

type nationalNum = number
type idNum = number

type pkmnDataStore = (key: idNum) => SortAtom<nationalNum>

export function FactoryPkmnNumCard(DataStore: pkmnDataStore): RenderById {
    return (idx) => {
        if (typeof idx !== 'number') {
            return <div>FactoryPkmnNumCard: Invalid index</div>
        }
        const nationalNum: nationalNum = DataStore(idx).data
        return <PkmnDexNumCard dexNum={nationalNum} />
    }
}
