<script lang="ts" setup>
    import type { idData } from '~/Factory/DataRender'
    import { intStoreFactory } from '~/Factory/intStore'
    import { FactoryPkmnNumCard } from '~/Factory/pkmnNumCard'
    import { pkmnStore } from '~/Factory/pkmnStore'
    import type { SortAtom } from '~/types/sorting'
    import randomiseArray from '~/utils/array/randomise'

    const testNums = range(9) //0-indexed array of DATA from 1 to 12
    const testArray: Array<number> = randomiseArray(testNums)
    const numAtomArray = declareArrayAtomic(testArray).data

    const f_resATOM = ref(false)
    const out_resATOM = ref([] as Array<SortAtom<idData>>)

    const grid = {
        xCount: 3,
        yCount: 3,
    }

    const pf = FactoryPkmnNumCard(pkmnStore)
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
            :gridSize="grid"
            :resultsGrid="grid"
            :dataRenderFunction="pf"
            :defaultRenderFunction="() => pf(0)"
            :renderResultsPile="true"
            v-model:finished="f_resATOM"
            v-model:outPile="out_resATOM"
        />
    </UContainer>
</template>

<style></style>
