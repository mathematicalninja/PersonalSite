<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { useFetchMarkdown } from '~/composables/fetch/markdown'

    const route = useRoute()
    const { markdown, loading, error } = useFetchMarkdown(
        `${route.params.fileSlug}`,
    )
</script>

<template>
    <div v-if="loading">Loading... {{ `${route.params.fileSlug}` }}</div>
    <div
        v-else
        class="content-container"
    >
        <RenderMarkdown
            v-if="markdown"
            :markdown="markdown"
        />
        <div v-else>Not found.</div>
    </div>
</template>

<style scoped>
    .content-container {
        padding-left: 2rem;
        padding-right: 2rem;
    }
</style>
