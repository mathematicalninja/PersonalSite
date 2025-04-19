<script lang="ts" setup>
    import { testMixPiles } from '~/constants/pkmnTestData'
    import type { idData } from '~/Factory/DataRender'
    import { FactoryPkmnNumCard } from '~/Factory/pkmnNumCard'
    import { pkmnStore } from '~/Factory/pkmnStore'
    import type { SortAtom } from '~/types/sorting'

    const grid = {
        xCount: 7,
        yCount: 2,
    }
    const pf = FactoryPkmnNumCard(pkmnStore)
    const f_resMIX = ref(false)
    const out_resMIX = ref([] as Array<SortAtom<idData>>)
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
            <!-- TODO: pass in a results xCount -->

            <NlognMixCompare
                :inPiles="testMixPiles"
                :gridSize="grid"
                :resultsGrid="{
                    xCount: 6,
                    yCount: 4,
                }"
                :dataRenderFunction="pf"
                :defaultRenderFunction="() => pf(0)"
                :renderResultsPile="true"
                v-model:finished="f_resMIX"
                v-model:outPile="out_resMIX"
            />
        </UContainer>
    </div>
</template>

<style></style>
