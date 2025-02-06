// import { readFile } from "fs/promises";
import data from '~/public/img/pkmn/png/fullArt/img_data.json'
import { FullArtFolderPath } from '~/constants/pkmn'

export const usePkmnGetFullArtJson = (genNum: Number, dexNum: Number) => {
    const p = [FullArtFolderPath, dexNum.toString() + '.json'].join('/')
}

export function lazyData(dexNum: number): [number, number] {
    for (let index = 0; index < data.length; index++) {
        const element = data[index]
        const stripedNum = element.name.split('.')[0]
        if (dexNum.toString() === stripedNum) {
            return [element.height, element.width]
        }
    }
    return [140, 140]
}
