import type { ElementShape } from '../layout/grid'
import type { PkmnCardInfo, PokeDexNumber } from './pkmn'

export type PkmnDexCard_Props = {
    pokeCardInfo: PkmnCardInfo
    imageBoundry?: ElementShape
    cardBoundry?: ElementShape
    onClick?: () => void
    // TODO: #74 add in method or alternative component  => dexNum only generates card rather than pokeCardInfo
}

export type PkmnNationalNumCard_Props = {
    nationalNum: number
    imageBoundry?: ElementShape
    cardBoundry?: ElementShape
    onClick?: () => void
}

export type pkmnImgProps = {
    pokeDexNum: PokeDexNumber
    parentShape?: ElementShape
}
