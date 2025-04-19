import type { idData } from './DataRender'

export const pkmnStore = (idx: idData) => {
    if (typeof idx !== 'number') {
        return tagAtomic(0)
    }
    return tagAtomic(idx)
    // e.g. "pikachu" would be idx=25 and return {state: 'atom', data: 25}
    // "pokeball" would have idx=0
}
