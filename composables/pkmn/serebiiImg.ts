import type { NationalNum } from '~/types/component/pkmn'

export const usePkmnSerebiiImg = (NationalDexNum: NationalNum) => {
    return 'https://serebii.net/art/th/' + NationalDexNum.toString() + '.png'
}
