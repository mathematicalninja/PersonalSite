<script setup lang="tsx">
import { usePkmnGetFullArtPath } from "~/composables/pkmn/getImgPath";

const props = defineProps({
  dexNum: { type: Number, required: true },
  genNum: { type: Number, required: true },
});
</script>

<template>


  <AlignmentCenterDiv>
    <div>

      <UContainer 
          style="padding: 0%;"
          class="flex "
          >

          <NuxtImg
          class="hover:scale-150 hover:bg-opacity-25 hover:bg-black"

          :src="usePkmnGetFullArtPath(props.genNum, props.dexNum)"
          :width="width"
          :height="height"
          />
        </UContainer>
    </div>
  </AlignmentCenterDiv>

</template>

<style scoped></style>
