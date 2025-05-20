import type { NationalNum } from '~/types/component/pkmn'
import type { NlognElement } from '~/types/nlogn/dataStruct'
import { recursiveTagAndDistribute } from '~/utils/array/distributeEvenlyForSorting'
import { range } from '~/utils/array/range'

export function useMakeDexPiles_National({
    genCap,
    pileCap,
    pileMin,
}: {
    genCap: number
    pileCap: number
    pileMin?: number
}) {
    const newDexValues = range(genCap)
    const newDexNums: Array<NationalNum> = []

    for (let n of newDexValues) {
        if (pileMin && n < pileMin) {
            continue
        }
        newDexNums.push(n)
    }

    const recursiveDex: NlognElement<NationalNum> = recursiveTagAndDistribute(
        newDexNums,
        pileCap,
    )

    return ref(recursiveDex)
}
