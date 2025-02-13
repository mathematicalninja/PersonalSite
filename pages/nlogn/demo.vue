<template>
  <div>
    {{ unsortedInt }}
  </div>
  <div
  class="border-2 border-white w-16 h-16
   text-5xl flex justify-center items-center"

  >

    {{ unsortedInt[0] }}
  </div>
  
</template>

<script lang="ts" setup>
import type { NestedArray } from '~/types/NestedArray';
import randomiseArray from '~/utils/array/randomise';


const unsortedInt:NestedArray<Number> = randomiseArray(range(16))

</script>

<style>


</style>