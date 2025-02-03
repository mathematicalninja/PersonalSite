<script setup lang="ts">
// import { UCard } from "#build/components";
const ui = /* ui */ {
  background: 'bg-white dark:bg-slate-900'
}

const cardui = /* ui */ "text-5xl"

</script>

<template>
  <!-- <div class="text-5xl">Component: Header/Title</div> -->
  <UCard 
  :ui="{base:'p-0 m-0 text-5xl'}"
  > 
    Alex Duncan
    <HeaderTagline />
  </UCard>
</template>

<style scoped></style>
