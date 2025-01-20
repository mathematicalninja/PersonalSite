<script setup lang="ts">
import Hover from "~/components/Alignment/Hover.vue";
import { usePkmnGetFullArtPath } from "~/composables/pkmn/getImgPath";
const dexNum = ref(45);
const picWidth = 140;
const picHeight = 140;
const genMin = 1;
const genMax = 151;
</script>

<template>
  <div>Page: nlogn/pkmn/gen1</div>
  <div>path = {{ usePkmnGetFullArtPath(1, 1) }}</div>
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

    <div
      class="flex justify-center  p-2 border-2 border-red-700"
      >
      <div v-for="i in [0, 1, 2]"
      >
      <div v-for="h in [dexNum + i, dexNum + i + 3, dexNum + i + 6]"
      class="flex justify-center "
      :style="{ width: picWidth + 'px', height: picHeight + 'px', border: '2px', borderColor: 'purple' }"
      
        >
          <PkmnDexImg
          :dex-num="h"
          :gen-num="1"
          :parent_height="picHeight"
          :parent_width="picWidth"
          />
      </div>
    </div>
    </div>

    <div class="flex">
      <PkmnDexImg
        :dex-num="dexNum"
        :gen-num="1"
      />
      <PkmnDexImg
        :dex-num="dexNum + 1"
        :gen-num="1"
        :parent_height="picHeight"
        :parent_width="picWidth"
      />
      <PkmnDexImg
        :dex-num="dexNum + 2"
        :gen-num="1"
      />
    </div>
  </div>
  <span>Number: {{ dexNum }}</span>
</template>

<style scoped>
</style>
