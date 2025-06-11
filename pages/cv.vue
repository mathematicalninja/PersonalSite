<script setup lang="ts">
    const about = await useFetch('/api/txt?file=about.md')
    const coding = await useFetch('/api/txt?file=coding.md')
    const disability = await useFetch('/api/txt?file=disability.md')
    const maths = await useFetch('/api/txt?file=maths.md')
    const teaching = await useFetch('/api/txt?file=teaching.md')
    const blank = 'hi'
</script>

<template>
    <!-- About -->
    <RenderMarkdownBlurb
        v-if="about !== null && about.data.value !== null"
        :markdown="about.data.value"
        link="content/about.md"
        alignment="left"
    />
    <!-- Coding -->
    <RenderMarkdownBlurb
        v-if="coding !== null && coding.data.value !== null"
        :markdown="coding.data.value"
        link="content/coding.md"
        alignment="right"
    />
    <!-- Disability -->
    <!-- Maths -->
    <RenderMarkdownBlurb
        v-if="maths !== null && maths.data.value !== null"
        :markdown="maths.data.value"
        link="content/maths.md"
        alignment="left"
    />
    <!-- Teaching -->
    <RenderMarkdownBlurb
        v-if="teaching !== null && teaching.data.value !== null"
        :markdown="teaching.data.value"
        link="content/teaching.md"
        alignment="right"
    />
    <RenderMarkdownBlurb
        v-if="disability !== null && disability.data.value !== null"
        :markdown="disability.data.value"
        link="content/disability.md"
        alignment="left"
    />
</template>

<style scoped></style>
