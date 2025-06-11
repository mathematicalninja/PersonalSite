import type { NationalNum } from '~/types/component/pkmn'
import type { PkmnStore_National } from '~/types/component/stores'

export const pkmnStore_National = (nationalNum: NationalNum) => {
    if (typeof nationalNum !== 'number') {
        return 0
    }
    return nationalNum
    // e.g. "pikachu" would be idx=25 and return {state: 'atom', data: 25}
    // "pokeball" would have idx=0
}

// TODO: use datascrape to better make a pkmn store

function pkmnStore_National_Factory(): PkmnStore_National {
    return pkmnStore_National
}

// TODO: Once data is scraped; convert this to a pinia store
