import { FullArtFolderPath } from '~/constants/pkmn'

export const usePkmnGetFullArtPath = (genNum: number, dexNum: number) => {
    if (dexNum == 0) {
        return [FullArtFolderPath, 'pokeball.png'].join('/')
    }
    const p = [FullArtFolderPath, dexNum.toString() + '.png'].join('/')
    return p
}
