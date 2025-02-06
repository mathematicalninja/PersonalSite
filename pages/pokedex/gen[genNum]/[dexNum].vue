<template>
    <div> poekdex </div>
    <div>Generation: {{ genNum }}</div>
    <div># {{ dexNum }}</div>
</template>

<script lang="ts" setup>
    const route = useRoute()

    // When accessing /posts/1, route.params.id will be 1
    const genNum = route.params.genNum
    const dexNum = route.params.dexNum
</script>

<style></style>
