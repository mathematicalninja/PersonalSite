import PkmnDexNumCard from '~/components/pkmn/dex/numCard.vue'
import type { NationalNum } from '~/types/component/pkmn'
import type { PkmnRender_National } from '~/types/component/stores'

export function pkmnRender_National_Factory(): PkmnRender_National {
    return function (nationalNum: NationalNum) {
        return <PkmnDexNumCard nationalNum={nationalNum} />
    }
}
