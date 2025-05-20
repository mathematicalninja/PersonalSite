import { FullArtFolderPath } from '~/constants/pkmn'

import type { NationalNum, PokeDexNumber } from '~/types/component/pkmn'
export const usePkmnGetFullArtPath = (pkDexNum: PokeDexNumber) => {
    // TODO: fix for oddities in pkmn nums
    if (pkDexNum.numInDex == 0) {
        return [FullArtFolderPath, 'pokeball.png'].join('/')
    }
    const p = [FullArtFolderPath, pkDexNum.numInDex.toString() + '.png'].join(
        '/',
    )
    return p
}

export const usePkmnGetFullArtPath_National = (NationalDexNum: NationalNum) => {
    if (NationalDexNum == 0) {
        return [FullArtFolderPath, 'pokeball.png'].join('/')
    }
    const p = [FullArtFolderPath, NationalDexNum.toString() + '.png'].join('/')
    return p
}
