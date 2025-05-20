<script setup lang="ts">
    import Hover from '~/components/Alignment/Hover.vue'
    import { usePkmnGetFullArtPath_National } from '~/composables/pkmn/getImgPath'
    const numInDex = ref(1)
    const picWidth = 140
    const picHeight = 140
    const genMin = 1
    const genMax = 151

    // TODO: #117 move nlogn/pkmn/gen1 to pokedex/gen1
</script>

<template>
    <!-- <div>Page: nlogn/pkmn/gen1</div>
    <div>path = {{ usePkmnGetFullArtPath_National(1) }}</div> -->
    <div class="flex-row">
        <div class="p-2 flex justify-center">
            <UButton
                class=""
                @click="
                    numInDex > genMin ? (numInDex -= 1) : (numInDex = numInDex)
                "
            >
                -
            </UButton>

            <span class="p-2">Number: {{ numInDex }}</span>
            <UButton
                class=""
                @click="
                    numInDex < genMax ? (numInDex += 1) : (numInDex = numInDex)
                "
            >
                +
            </UButton>
        </div>

        <div class="flex justify-center p-2 border-2 border-red-700">
            <div v-for="i in [0, 1, 2]">
                <div
                    v-for="h in [
                        numInDex + i - 4,
                        numInDex + i - 1,
                        numInDex + i + 2,
                    ]"
                    class="flex justify-center"
                    :style="{
                        width: picWidth + 'px',
                        height: picHeight + 'px',
                        border: '2px',
                        borderColor: 'purple',
                    }"
                >
                    <div
                        v-if="h == numInDex + i - 1 && i == 1"
                        class="border-2 border-red-700"
                        ><AlignmentCenterDiv>
                            <PkmnDexImg
                                v-if="h <= genMax && h >= genMin"
                                :key="h"
                                :pokeDexNum="{ genNum: 1, numInDex: h }"
                                :parent_height="picHeight"
                                :parent_width="picWidth"
                            />
                        </AlignmentCenterDiv>
                    </div>
                    <div v-else>
                        <PkmnDexImg
                            v-if="h <= genMax && h >= genMin"
                            :key="h"
                            :pokeDexNum="{ genNum: 1, numInDex: h }"
                            :parent_height="picHeight"
                            :parent_width="picWidth"
                        />
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="flex">
            <PkmnDexImg
                v-if="numInDex - 1 <= genMax && numInDex >= genMin"
                :pokeDexNum="{ genNum: 1, numInDex: numInDex - 1 }"
            />
            <PkmnDexImg
                v-if="numInDex <= genMax && numInDex >= genMin"
                :pokeDexNum="{ genNum: 1, numInDex: numInDex }"
                :parent_height="picHeight"
                :parent_width="picWidth"
            />
            <PkmnDexImg
                v-if="numInDex + 1 <= genMax && numInDex >= genMin"
                :pokeDexNum="{ genNum: 1, numInDex: numInDex + 1 }"
            />
        </div> -->
    </div>
</template>

<style scoped></style>
