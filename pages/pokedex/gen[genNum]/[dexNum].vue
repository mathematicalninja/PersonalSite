<template>
    <h1>Pokedex, Generation: {{ genNum }}</h1>
    <h2># {{ dexNum }}</h2>
</template>

<script lang="ts" setup>
    const route = useRoute()
    const genNum = route.params.genNum
    const dexNum = route.params.dexNum
</script>

<style></style>
