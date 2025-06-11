import { firstUnsorted } from './nlognFirstUnsorted'
import type { DataId } from '~/types/generics/DataId'
import type { NlognElement } from '~/types/nlogn/dataStruct'
import {
    isAtom,
    isSorted,
    midSort_unsortedConst,
    partial_unsortedConst,
    recursive_unsortedConst,
    sorted_ArrayConst,
    unsorted_ArrayConst,
} from '~/types/nlogn/dataStruct'

describe('firstUnsorted', () => {
    it('returns -2 if piles is undefined', () => {
        expect(firstUnsorted(undefined as any)).toBe(-2)
    })

    it('returns -2 if piles is null', () => {
        expect(firstUnsorted(null as any)).toBe(-2)
    })

    it('returns -2 if piles is empty', () => {
        expect(firstUnsorted([])).toBe(-2)
    })

    it('returns -1 if all piles are atom or sorted', () => {
        // 0: atom, 1: sorted, 2: sorted "Array"
        const piles = [
            { state: 'atom' },
            { state: sorted_ArrayConst },
            { state: sorted_ArrayConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(-1)
    })

    it('returns -1 for only atoms', () => {
        // 0: atom, 1: atom, 2: atom

        const piles = [
            { state: 'atom' },
            { state: 'atom' },
            { state: 'atom' },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(-1)
    })

    it('returns -1 for only atoms', () => {
        // 0: sorted, 1: sorted, 2: sorted

        const piles = [
            { state: sorted_ArrayConst },
            { state: sorted_ArrayConst },
            { state: sorted_ArrayConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(-1)
    })

    it('returns index of first unsorted pile', () => {
        // 0: atom, 1: sorted, 2: unsorted "Array"

        const piles = [
            { state: 'atom' },
            { state: sorted_ArrayConst },
            { state: unsorted_ArrayConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(2)
    })

    it('returns index of first unsorted pile', () => {
        // 0: atom, 1: sorted, 2: recursive unsorted "Array"

        const piles = [
            { state: 'atom' },
            { state: sorted_ArrayConst },
            { state: recursive_unsortedConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(2)
    })

    it('returns index of first unsorted pile', () => {
        // 0: atom, 1: sorted, 2: recursive midSort "Array"

        const piles = [
            { state: 'atom' },
            { state: sorted_ArrayConst },
            { state: midSort_unsortedConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(2)
    })

    it('returns index of first unsorted pile', () => {
        // 0: atom, 1: sorted, 2: recursive partial sorted "Array"

        const piles = [
            { state: 'atom' },
            { state: sorted_ArrayConst },
            { state: partial_unsortedConst },
        ] as NlognElement<DataId>[]
        expect(firstUnsorted(piles)).toBe(2)
    })
})
