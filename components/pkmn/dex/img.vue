<script setup lang="tsx">
import { usePkmnGetImgPath } from "~/composables/pkmn/getImgPath";

const props = defineProps({
  dexNum: { type: Number, required: true },
  genNum: { type: Number, required: true },
});
</script>

<template>
  <AlignmentCenterDiv>
  </AlignmentCenterDiv>
</template>

<style scoped></style>
