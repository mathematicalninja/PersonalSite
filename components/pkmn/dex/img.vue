<script setup lang="tsx">
import { usePkmnGetImgPath } from "~/composables/pkmn/getImgPath";
import HeightWidthFromParent from "~/utils/calculate/HeightWidthFromParent";
import HeightWidthRatio from "~/utils/calculate/HeightWidthRatio";

const props = defineProps({
  dexNum: { type: Number, required: true },
  genNum: { type: Number, required: true },
  parent_width: { type: Number, required: false, default: 100 },
  parent_height: { type: Number, required: false, default: 100 },
});

function getImageHeightWidth(path: string): [number, number] {
  return [20, 20];
}

const [imgHeight, imgWidth] = getImageHeightWidth(
  usePkmnGetImgPath(props.genNum, props.dexNum)
);

const [calcHeight, calcWidth] = HeightWidthFromParent(
  HeightWidthRatio(imgHeight, imgWidth),
  props.parent_height,
  props.parent_width
);
</script>

<template>
  <!-- <div>Component: pkmn/dex/img</div> -->
  <div class="flex pokePicContainer">
    <NuxtImg
      :width="calcHeight"
      :height="calcWidth"
      class="justify-self-center pokePicImage"
      :src="usePkmnGetImgPath(props.genNum, props.dexNum)"
      fit="inside"
    />
  </div>
</template>

<style scoped>
.pokePicContainer {
  border-width: 2px;
}

.pokePicImage {
  object-fit: contain;
}
</style>
