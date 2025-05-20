<script lang="ts" setup>
    import { testMixPiles } from '~/constants/pkmnTestData'
    import { pkmnRender_National_Factory } from '~/Factory/pkmnRender'

    import type { DataId } from '~/types/generics/DataId'
    import type { Atom } from '~/types/nlogn/dataStruct'

    const grid = {
        x: 7,
        y: 4,
    }

    const pokeRender = pkmnRender_National_Factory()
    const f_resMIX = ref(false)
    const out_resMIX = ref([] as Array<Atom<DataId>>)
</script>

<template>
    <div>
        <!-- PILES -->
        <div v-if="f_resMIX">
            Internally the data for this particular sorting is stored as:
            <div> {{ out_resMIX }} </div>
        </div>

        <UContainer
            class="flex border-green-500 border-2 align-center justify-center bg-black"
            style="padding: 0%"
            width="500"
        >
            <!-- TODO: pass in a results x -->

            <NlognMixCompare
                :inPiles="testMixPiles"
                :grid="grid"
                :resultsGrid="{
                    x: 7,
                    y: 4,
                }"
                :dataRenderFunction="pokeRender"
                :defaultRenderFunction="() => pokeRender(0)"
                :renderResultsPile="true"
                v-model:finished="f_resMIX"
                v-model:outPile="out_resMIX"
            />
        </UContainer>
    </div>
</template>

<style></style>
