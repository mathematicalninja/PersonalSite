<script setup lang="tsx">
import { usePkmnGetFullArtPath } from "~/composables/pkmn/getImgPath";
// import  lazyData  from "~/composables/pkmn/getImageJson" ;
import HeightWidthFromParent from "~/utils/calculate/HeightWidthFromParent";
import HeightWidthRatio from "~/utils/calculate/HeightWidthRatio";

const props = defineProps({
  dexNum: { type: Number, required: true },
  genNum: { type: Number, required: true },

  parent_height: { type: Number, required: false, default: 140 },
  parent_width: { type: Number, required: false, default: 140 },
});


const h = computed(() => lazyData(props.dexNum)[0])
const w = computed(() => lazyData(props.dexNum)[1])
const r = computed(() => HeightWidthRatio(h.value,w.value))

const height = computed(() => HeightWidthFromParent(r.value,props.parent_height,props.parent_width)[0])
const width = computed(() => HeightWidthFromParent(r.value,props.parent_height,props.parent_width)[1])


const placeholder="img/pkmn/png/fullArt/pokeball.png"

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
