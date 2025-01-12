<script setup lang="ts">
import { usePkmnGetImgPath } from "~/composables/pkmn/getImgPath";
const dexNum = ref(11);
const picWidth = 250;
const picHeight = 150;
const genMin = 1;
const genMax = 151;
</script>

<template>
  <div>Page: nlogn/pkmn/gen1</div>
  <div>path = {{ usePkmnGetImgPath(1, 1) }}</div>
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
      class="flex justify-center p-8 border-2 border-red-700"
      :width="picWidth"
    >
      <div v-for="i in [0, 1, 2]">
        <div v-for="h in [dexNum + i, dexNum + i + 3, dexNum + i + 6]">
          <PkmnDexImg
            :dex-num="h"
            :gen-num="1"
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

<style scoped></style>
