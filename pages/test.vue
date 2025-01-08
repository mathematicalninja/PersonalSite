<script setup lang="ts">
// import { NuxtImg } from "#build/components";

type pokeNumber = { dexNum: number; genNum: number };

const dexNum = ref(17);
const range = 8;
const piles: pokeNumber[] = [{ dexNum: 1, genNum: 3 }];
</script>

<template>
  <div>
    Page: test
    <PkmnDexImg
      :dexNum="dexNum"
      :genNum="1"
    />
  </div>
</template>

<style scoped></style>
