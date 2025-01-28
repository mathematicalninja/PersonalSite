<script setup lang="ts">
import { lazyData } from "~/composables/pkmn/getImageJson";
import HeightWidthFromParent from "~/utils/calculate/HeightWidthFromParent";
import HeightWidthRatio from "~/utils/calculate/HeightWidthRatio";

import pokenumber from "~/types/pokenumber";

const dexNum = ref(151);
const range = 8;
const piles: pokeNumber[] = [{ dexNum: 1, genNum: 3 }];

const props = {
  dexNum: dexNum,
  genNum: 6,
  parent_height: 140,
  parent_width: 140,
};

// const props = defineProps({
//   dexNum: { type: Number, required: true },
//   genNum: { type: Number, required: true },

//   parent_height: { type: Number, required: false, default: 140 },
//   parent_width: { type: Number, required: false, default: 140 },
// });

// const [h,w] = lazyData(props.dexNum.value);
// const [h,w] = [computed(() => lazyData(dexNum.value)[0]),computed(() => lazyData(dexNum.value)[1])]
const h = computed(() => lazyData(dexNum.value)[0]);
const w = computed(() => lazyData(dexNum.value)[1]);

const sizes = computed(() => lazyData(dexNum.value));

// const [h,w] = sizes.value

// const r = HeightWidthRatio(h,w)
// const [height,width] = HeightWidthFromParent(r,props.parent_height,props.parent_width)

// Creating a writable computed ref:

const count = ref(dexNum);
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val;
  },
});
</script>

<template>
  <div>h: {{ h }} w: {{ w }}</div>
  <UButton @click="plusOne = 151"> Mew </UButton>
  <UButton @click="plusOne = 300"> skitty </UButton>
  <UButton @click="plusOne = 14"> Kakhuna </UButton>

  <UContainer
    class="flex border-green-500 border-2 align-center justify-center bg-black"
    style="padding: 0%"
    width="500"
  >
    <PkmnDexImg
      :dex-num="dexNum"
      :gen-num="1"
      :parent_height="300"
      :parent_width="300"
    />
  </UContainer>
</template>

<style scoped></style>
