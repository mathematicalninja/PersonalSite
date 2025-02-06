// import * as path from "node:path";

import { FullArtFolderPath } from '~/constants/pkmn'

// import path from "node:path"

export const usePkmnGetFullArtPath = (genNum: number, dexNum: number) => {
    // console.log(FullArtFolderPath)
    const p = [FullArtFolderPath, dexNum.toString() + '.png'].join('/')
    // console.log(p)
    // console.log(path.join(FullArtFolderPath, dexNum.toString() + ".png"))
    return p
}
