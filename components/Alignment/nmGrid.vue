<template>
  <div v-for="i in mRange" :key="i" class="grid-row">
    <div v-for="h in nRange" :key="h" class="grid-item">
        <slot name="grid-item" :index="(i - 1) * props.n + (h - 1)"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  /**
   * nmGrid.vue
   * 
   * This component generates a grid layout for an array of html/vue elements based on the provided `m` and `n` props.
   * - `n` represents the number of rows.
   * - `m` represents the number of columns.
   * 
   * Each grid item is rendered using a slot, allowing for flexible content insertion.
   * The `index` of each grid item is calculated and passed to the slot as a prop.
   */
  const props = defineProps({
    m:{
      type: Number,
      required: true
    },
    n:{
      type: Number,
      required: true
    }
  })

  const mRange = range(props.m)
  const nRange = range(props.n)

</script>

<style scoped>
.grid-row {
  display: flex;
}
.grid-item {
  display: flex;
}
</style>
<!-- Example implementation: -->
<!--
<div>
  <nm-grid :m="4" :n="4">
    <template #grid-item="{ index }">
      <div v-if="index < testNums.length" :key="index" class="border-2 border-white text-5xl w-16 h-16 ">
        <AlignmentCenterDiv>
          {{ testNums[index] }}
        </AlignmentCenterDiv>
      </div>
    </template>
  </nm-grid>
</div>
-->