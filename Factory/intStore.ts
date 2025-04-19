import type { AtomicArray } from '~/types/sorting'
import type { idData } from './DataRender'

export function intStoreFactory(arr: AtomicArray<number>) {
    const intStore = (idx: idData) => {
        // idData is a 0-indexed number, that's the array's position
        if (idx == -1) {
            return tagAtomic(-1)
        }
        if (typeof idx !== 'number') {
            return tagAtomic(-2)
        }
        if (idx < 0) {
            return tagAtomic(-3)
        }
        if (idx > arr.length) {
            return tagAtomic(-4)
        }
        return arr[idx]
    }

    return intStore
}
