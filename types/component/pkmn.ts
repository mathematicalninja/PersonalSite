import type { JSX } from 'vue/jsx-runtime'
import type { Atom } from '../nlogn/dataStruct'
import type { ElementShape } from '../layout/grid'

/**
 * Used to tell render functions what the pkmn card should look like.
 */
export type PkmnImageJson = {
    height: number // height in px
    width: number // width in px
    name: string // name of the Pokemon
}

/**
 * Identifier for pkmn by dex entry (note, may **not** be unique)
 */
export type PokeDexNumber = { numInDex: number; genNum: number }

/**
 * Info to render on a card.
 */
export type PkmnCardInfo = {
    name: string
    num: PokeDexNumber
}
/**
 * An atom that contains the data for a Pokemon card.
 */
export type PokeDexAtom = Atom<PkmnCardInfo>

/**
 * longhand for number
 */
export type NationalNum = number
/**
 * takes a nationalDexNum and returns the data needed to render a card.
 */
type PkmnNationalNumCard_Store = (nationalDexNum: NationalNum) => PkmnImageJson
/**
 * takes a nationalDexNum and returns a render function for that card.
 */
type PkmnNationalNumCard_Render = (nationalDexNum: NationalNum) => JSX.Element

/**
 * Takes an ID and returns a specific pkmn, current implementation uses
 * @type {PokeDexNumber} as the ID.
 */
type PkmnCardDataStore = (DataID: PokeDexNumber) => PkmnCardInfo
