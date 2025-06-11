import type { DataId } from '~/types/generics/DataId'
import { isAtom, isSorted, type NlognElement } from '~/types/nlogn/dataStruct'

/**
 *
 * @param piles
 * @returns index  of the first pile that needs to be sorted.
 * @returns -1 if all piles are sorted.
 * @returns -2 if piles is empty/not a list.
 */
export function firstUnsorted(piles: Array<NlognElement<DataId>>): number {
    if (!piles || !piles.length) return -2
    // find the first pile that is not sorted
    for (let i = 0; i < piles.length; i++) {
        if (isAtom(piles[i]) || isSorted(piles[i])) {
            continue
        }
        return i
    }
    return -1
}
