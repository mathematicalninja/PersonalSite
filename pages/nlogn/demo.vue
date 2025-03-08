<template>
    <div>
        {{ unsortedInt }}
    </div>

    <AlignmentNmGrid
        :n="4"
        :m="4"
    >
        <template #grid-item="{ index }">
            <div
                class="border-2 border-white text-5xl w-16 h-16"
                v-if="index < unsortedInt.length"
                :key="index"
            >
                <AlignmentCenterDiv>
                    {{ unsortedInt[index] }}
                </AlignmentCenterDiv>
            </div>
        </template>
    </AlignmentNmGrid>
    {{ recursiveInts }}
</template>

<script lang="ts" setup>
    import type { NestedArray } from '~/types/NestedArray'
    import type { pokeNumber } from '~/types/pkmn'
    import type { RecursiveSortArray } from '~/types/sorting'
    import randomiseArray from '~/utils/array/randomise'
    import DexNum from '../pokedex/gen[genNum]/[dexNum].vue'

    const intCount = 16
    const unsortedInt: NestedArray<Number> = randomiseArray(range(intCount))

    const recursiveInts = recursiveTagAndDistribute(range(intCount), 4)

    /**
     * TODO: need to be able to pass a "renderable" into the recursiveTagAndDistribute function, or use its output to generate renderables.
     *
     *
     *  Need a "dig down" function that gets down to the list of Atomics.
     *  This is what "B" does
     *
     *  Use these atoms to generate renderables.
     *       ==> have a component that the atom can be passed to as a prop.
     *  Use these renderables to generate a grid.
     *  This os what "A" does
     * */

    // TODO: Here we need to make it so
    // A1. Atomic Arrays are checked for
    // A2. Atomic Arrays can be rendered
    // A3. Atomic Arrays can be sorted in place

    // B1. Sorted Arrays (as elements) can be checked for.
    // B2. Sorted arrays can have their top element (which should be atomic) used as its representative element.
    // B3. these elements can be rendered
    // B4. these elements can be used in the sorting algorithm to create a unified pile.

    // C1. Sorted Piles can be checked for, and passed
</script>

<style></style>
