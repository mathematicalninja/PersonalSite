import data from '~/public/img/pkmn/png/fullArt/img_data.json'
import { FullArtFolderPath } from '~/constants/pkmn'
import type { PkmnCardInfo } from '~/types/component/pkmn'
import type { ElementShape } from '~/types/layout/grid'

export const usePkmnGetFullArtJsonPath = (dexNum: Number) => {
    const p = [FullArtFolderPath, dexNum.toString() + '.json'].join('/')
}

// TODO: de-Lazy these.

export function getPkmnImgSize_Lazy(nationalDexNum: number): ElementShape {
    try {
        const element = data[nationalDexNum] as ElementShape
        return element
    } catch (error) {
        // TODO: better error handling.
        return { width: 140, height: 140 }
    }
}

export function getPokeCardInfo_Lazy(
    dexNum: number,
    genNum: number,
): PkmnCardInfo {
    const dataElement = data[dexNum]

    return {
        name: dataElement.name,
        num: {
            numInDex: dexNum,
            genNum: genNum,
        },
    }
}
