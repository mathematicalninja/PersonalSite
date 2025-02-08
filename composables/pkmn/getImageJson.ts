// import { readFile } from "fs/promises";
import data from '~/public/img/pkmn/png/fullArt/img_data.json'
import { FullArtFolderPath } from '~/constants/pkmn'
import type { PkmnImageJson, pokeCardInfo } from '~/types/pkmn'

export const usePkmnGetFullArtJsonPath = (dexNum: Number) => {
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


export function getPkmnImageJson(dexNum: number, genNum:number): pokeCardInfo {
    
    function stripedNum(element:PkmnImageJson) {return Number(element.name.split('.')[0])}
    data.sort((a,b)=>{
        return stripedNum(a) > stripedNum(b) ? 1 : -1
    })
    const dataElement =  data[dexNum-1] // Note that the dexNum is 1-indexed, but the array is 0-indexed
    console.log(dataElement)
    
    return {
        name: dataElement.name,
        num: {
            dexNum: dexNum,
            genNum: genNum
        }
    }
}