<script setup lang="ts">
    import Hover from '~/components/Alignment/Hover.vue'
    import { usePkmnGetFullArtPath_National } from '~/composables/pkmn/getImgPath'
    const dexNum = ref(45)
    const picWidth = 140
    const picHeight = 140
    const genMin = 1
    const genMax = 151

    // TODO: update gen[genNum]/default.vue to use path variables
</script>

<template>
    <div>Page: nlogn/pkmn/gen1</div>
    <div>path = {{ usePkmnGetFullArtPath_National(1) }}</div>
    <div class="flex-row">
        <div class="">
            <UButton
                class=""
                @click="dexNum > 1 ? (dexNum -= 1) : (dexNum = dexNum)"
            >
                -
            </UButton>
            <UButton @click="dexNum += 1"> + </UButton>
        </div>

        <div class="flex justify-center p-2 border-2 border-red-700">
            <div v-for="i in [0, 1, 2]">
                <div
                    v-for="h in [dexNum + i, dexNum + i + 3, dexNum + i + 6]"
                    class="flex justify-center"
                    :style="{
                        width: picWidth + 'px',
                        height: picHeight + 'px',
                        border: '2px',
                        borderColor: 'purple',
                    }"
                >
                    <PkmnDexImg
                        :pokeDexNum="{ genNum: 1, numInDex: h }"
                        :gen-num="1"
                        :parent_height="picHeight"
                        :parent_width="picWidth"
                    />
                </div>
            </div>
        </div>

        <div class="flex">
            <PkmnDexImg
                :v-if="dexNum - 1 > 0"
                :pokeDexNum="{ genNum: 1, numInDex: dexNum + -1 }"
            />
            <PkmnDexImg :pokeDexNum="{ genNum: 1, numInDex: dexNum }" />
            <PkmnDexImg
                :pokeDexNum="{ genNum: 1, numInDex: dexNum + 1 }"
                :parent_height="picHeight"
                :parent_width="picWidth"
            />
        </div>
    </div>
    <span>Number: {{ dexNum }}</span>
</template>

<style scoped></style>
