<script lang="ts" setup>
    import { pkmnRender_National_Factory } from '~/Factory/pkmnRender'

    import { testPiles } from '~/constants/pkmnTestData'
    import type { DataId } from '~/types/generics/DataId'
    import type { Atom } from '~/types/nlogn/dataStruct'
    const grid = {
        x: 2,
        y: 2,
    }
    const pokeRender = pkmnRender_National_Factory()
    const f_resPILE = ref(false)
    const out_resPILE = ref([] as Array<Atom<DataId>>)
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
        <!-- TODO: pass in a results x -->
        <NlognPileCompare
            :inPiles="testPiles"
            :grid="grid"
            :resultsGrid="{
                x: 4,
                y: 5,
            }"
            :dataRenderFunction="pokeRender"
            :defaultRenderFunction="() => pokeRender(0)"
            :renderResultsPile="true"
            v-model:finished="f_resPILE"
            v-model:outPile="out_resPILE"
        />
    </UContainer>
</template>

<style></style>
