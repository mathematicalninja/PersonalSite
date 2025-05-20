<script lang="ts" setup>
    import { pkmnRender_National_Factory } from '~/Factory/pkmnRender'
    import type { DataId } from '~/types/generics/DataId'

    import type { Atom } from '~/types/nlogn/dataStruct'
    import { declareArrayAtomic } from '~/utils/array/distributeEvenlyForSorting'
    import randomiseArray from '~/utils/array/randomise'
    import { range } from '~/utils/array/range'

    const testNums = range(9) //0-indexed array of DATA from 1 to 12
    const testArray: Array<number> = randomiseArray(testNums)
    const numAtomArray = declareArrayAtomic(testArray).data

    const f_resATOM = ref(false)
    const out_resATOM = ref([] as Array<Atom<DataId>>)

    const grid = {
        x: 3,
        y: 3,
    }
    const pokeRender = pkmnRender_National_Factory()
</script>

<template>
    <!-- ATOMs -->
    <div v-if="f_resATOM">
        Internally the data for this particular sorting is stored as:
        <div> {{ out_resATOM }} </div>
    </div>
    <UContainer
        class="flex border-green-500 border-2 align-center justify-center bg-black"
        style="padding: 0%"
        width="500"
        height="600"
    >
        <NlognAtomCompare
            :inPile="numAtomArray"
            :grid="grid"
            :resultsGrid="grid"
            :dataRenderFunction="pokeRender"
            :defaultRenderFunction="() => pokeRender(0)"
            :renderResultsPile="true"
            v-model:finished="f_resATOM"
            v-model:outPile="out_resATOM"
        />
    </UContainer>
</template>

<style></style>
