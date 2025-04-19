<script lang="ts" setup>
    import type { idData } from '~/Factory/DataRender'
    import { intStoreFactory } from '~/Factory/intStore'
    import { FactoryPkmnNumCard } from '~/Factory/pkmnNumCard'
    import { pkmnStore } from '~/Factory/pkmnStore'
    import type { SortAtom, SortedArray } from '~/types/sorting'

    import { testPiles } from '~/constants/pkmnTestData'
    const grid = {
        xCount: 2,
        yCount: 2,
    }
    const pf = FactoryPkmnNumCard(pkmnStore)
    const f_resPILE = ref(false)
    const out_resPILE = ref([] as Array<SortAtom<idData>>)
</script>

<template>
    <!-- PILES -->
    <div v-if="f_resPILE">
        Internally the data for this particular sorting is stored as:
        <div> {{ out_resPILE }} </div></div
    >
    <UContainer
        class="flex border-green-500 border-2 align-center justify-center bg-black"
        style="padding: 0%"
        width="500"
    >
        <!-- TODO: pass in a results xCount -->
        <NlognPileCompareNew
            :inPiles="testPiles"
            :gridSize="grid"
            :resultsGrid="{
                xCount: 4,
                yCount: 5,
            }"
            :dataRenderFunction="pf"
            :defaultRenderFunction="() => pf(0)"
            :renderResultsPile="true"
            v-model:finished="f_resPILE"
            v-model:outPile="out_resPILE"
        />
    </UContainer>
</template>

<style></style>
