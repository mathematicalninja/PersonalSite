<template>
    <div
        class="markdown-content"
        :style="{ '--card-title': cardTitle, '--card-bg': cardBg }"
    >
        <div
            class="markdown-title"
            v-if="props.markdown.data.title"
            >{{ props.markdown.data.title }}</div
        >
        <MDC :value="props.markdown.content" />
    </div>
</template>

<script lang="ts" setup>
    import type { RenderMarkdownProps } from '~/types/component/renderProps'
    import { palette } from '~/constants/colors'

    const props = withDefaults(defineProps<RenderMarkdownProps>(), {
        alignment: 'left',
    })

    const cardTitle = palette.fuchsia
    const cardBg = palette.slate
</script>

<style scoped>
    :root {
        --card-title: var(--color-primary); /* fallback to fuchsia */
        --card-bg: var(--color-gray); /* fallback to slate */
    }
    .markdown-content h1 {
        font-size: 2.2rem;
        color: var(--card-title);
        margin-bottom: 1.2rem;
        font-weight: bold;
        letter-spacing: 0.01em;
    }
    .markdown-content h2 {
        font-size: 1.5rem;
        color: var(--card-title);
        margin-bottom: 1rem;
        font-weight: 600;
    }
    .markdown-content h3 {
        font-size: 1.2rem;
        color: var(--card-title);
        margin-bottom: 0.8rem;
        font-weight: 500;
    }
    .markdown-content p {
        color: #e0e0e0;
        line-height: 1.7;
        margin-bottom: 1.1rem;
    }
    .markdown-content a {
        color: var(--card-title);
        text-decoration: underline;
        transition: color 0.2s;
    }
    .markdown-content a:hover {
        color: #fff;
    }
    .markdown-title {
        font-size: 2rem;
        font-weight: bold;
        color: var(--card-title);
        margin-bottom: 1.5rem;
        letter-spacing: 0.02em;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
</style>
