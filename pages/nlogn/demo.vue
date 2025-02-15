<template>
  <div>
    {{ unsortedInt }}
  </div>
<div class="text-4xl">
Last clicked element: {{ clickedElement }}
</div>
<AlignmentNmGrid :n="4" :m="4">
  <template #grid-item="{ index }">
    <div
    class="border-2 border-white text-5xl w-16 h-16 "
      v-if="index < unsortedInt.length" 
      :key="index" 
    >
    <NlognClickCard
    :onClick="()=>{clickedElement= unsortedInt[index] as number}">

      <AlignmentCenterDiv>
        
        {{ unsortedInt[index] }}
      </AlignmentCenterDiv>
    </NlognClickCard>
    </div>
  </template>
</AlignmentNmGrid>
  
</template>

<script lang="ts" setup>
import type { NestedArray } from '~/types/NestedArray';
import randomiseArray from '~/utils/array/randomise';

const clickedElement = ref<number|string>("none")

const unsortedInt:NestedArray<Number> = randomiseArray(range(16))


</script>

<style>


</style>