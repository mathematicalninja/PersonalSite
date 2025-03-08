import type { RecursiveSortArray } from '~/types/sorting'
import type { pokeDexAtom } from '~/types/pkmn'

import { PkmnDexNumCard } from '#components'

export class PokeCard implements pokeDexAtom {
    data: { dexNum: number }

    constructor(dexNum: number) {
        this.data = { dexNum }
    }

    render() {
        return <PkmnDexNumCard dexNum={this.data.dexNum} />
    }
}

export function useMakeDexPiles(genCap: number, pileCap: number) {
    const newDexValues = range(genCap)
    const newDexNums: Array<pokeDexAtom> = []

    for (let n of newDexValues) {
        newDexNums.push(new PokeCard(n))
    }

    const recursiveDex: RecursiveSortArray<pokeDexAtom> =
        recursiveTagAndDistribute(newDexNums, pileCap)

    return ref(recursiveDex)
}
