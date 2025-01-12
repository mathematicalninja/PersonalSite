<script setup lang="ts">
type pokeNumber = { dexNum: number; genNum: number };

const dexNum = ref(17);
const range = 8;
const piles: pokeNumber[] = [{ dexNum: 1, genNum: 3 }];
</script>

<template>
  <UContainer
    class="border-2 border-orange-500 w-52 h-18 align-middle"
    :ui="{ padding: '' }"
  >
    <div>
      <PkmnDexImg
        :dexNum="dexNum"
        :genNum="1"
      />
    </div>
  </UContainer>
</template>

<style scoped></style>
