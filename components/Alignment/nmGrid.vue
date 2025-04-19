<template>
    <div class="nmGrid">
        <div
            v-for="i in mRange"
            :key="i"
            class="gridRow"
        >
            <div
                v-for="h in nRange"
                :key="h"
                class="gridItem"
            >
                <slot
                    name="gridItem"
                    :index="(i - 1) * props.n + (h - 1)"
                />
                <!-- TODO: #97 refactor "gridItem" in nmGrid as gridIndex -->
            </div>
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
        m: {
            type: Number,
            required: true,
        },
        n: {
            type: Number,
            required: true,
        },
    })

    const mRange = range(props.m)
    const nRange = range(props.n)
</script>

<style scoped>
    .gridRow {
        display: flex;
    }
    .gridItem {
        display: flex;
    }
    .nmGrid {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>
<!-- Example implementation: -->
<!--
<div>
  <nm-grid :m="4" :n="4">
    <template #gridItem="{ index }">
      <div v-if="index < testNums.length" :key="index" class="border-2 border-white text-5xl w-16 h-16 ">
        <AlignmentCenterDiv>
          {{ testNums[index] }}
        </AlignmentCenterDiv>
      </div>
    </template>
  </nm-grid>
</div>
-->
