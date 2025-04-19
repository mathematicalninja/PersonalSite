import data from '~/public/img/pkmn/png/fullArt/img_data.json'
import { FullArtFolderPath } from '~/constants/pkmn'
import type { pkmnImageJson, pokeCardInfo } from '~/types/pkmn'

export const usePkmnGetFullArtJsonPath = (dexNum: Number) => {
    const p = [FullArtFolderPath, dexNum.toString() + '.json'].join('/')
}

export function lazyData(dexNum: number): [number, number] {
    try {
        const element = data[dexNum]
        return [element.height, element.width]
    } catch (error) {
        return [140, 140]
    }
}

export function getPkmnImageJson(dexNum: number, genNum: number): pokeCardInfo {
    const dataElement = data[dexNum]
    console.log(dataElement)

    return {
        name: dataElement.name,
        num: {
            dexNum: dexNum,
            genNum: genNum,
        },
    }
}
