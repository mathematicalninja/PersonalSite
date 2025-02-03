<script setup lang="ts">
import { UContainer } from '#components';

const props = defineProps({
  h:{
    type:Number,
    required:false,
    default:100
  },
  w:{
    type:Number,
    required:false,
    default:100
  },
  onClick: {
    type:Function,
    required:true,
  }
});
</script>

<template>
  <div
    @click="() => onClick()"
  >
    <UContainer  
      style="padding: 0%;"
    >

      <slot/>
    </UContainer>
  </div>
</template>

<style scoped></style>
