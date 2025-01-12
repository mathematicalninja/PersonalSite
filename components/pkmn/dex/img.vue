<script setup lang="tsx">
import { usePkmnGetImgPath } from "~/composables/pkmn/getImgPath";

const props = defineProps({
  dexNum: { type: Number, required: true },
  genNum: { type: Number, required: true },
});
</script>

<template>
  <div
    class="flex border-white border-2 h-52 w-52 align-center justify-center fit-inside hover:scale-125"
  >
    <NuxtImg
      @load="alert(9)"
      :src="usePkmnGetImgPath(props.genNum, props.dexNum)"
    />
  </div>
</template>

<style scoped></style>
