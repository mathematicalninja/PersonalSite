<template>
    <div
        :class="['hero-card', alignment]"
        :style="{
            '--card-title': cardTitle,
            '--card-bg': cardBg,
            '--card-title-hover': cardTitleHover,
        }"
    >
        <NuxtLink
            :to="props.link"
            class="read-more-link"
        >
            <div
                class="hero-card-title"
                v-if="props.markdown.data.title"
            >
                {{ props.markdown.data.title }}
            </div>
        </NuxtLink>
        <MDC :value="props.markdown.data.blurb" />
        <div
            v-if="props.link"
            :class="['read-more', readMoreAlign]"
        >
            <NuxtLink
                :to="props.link"
                class="read-more-link"
            >
                Read more <span class="arrow">&rarr;</span>
            </NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { RenderMarkdownProps } from '~/types/component/renderProps'
    import { palette } from '~/constants/colors'

    const props = withDefaults(defineProps<RenderMarkdownProps>(), {
        alignment: 'center',
    })
    const alignment = props.alignment
    const readMoreAlign =
        alignment === 'left' || 'right' ? 'read-more-right' : 'read-more-below'

    const cardTitle = palette.fuchsia
    const cardBg = palette.slate
    const cardTitleHover = palette.gold
</script>

<style scoped>
    .hero-card {
        background: var(--card-bg, #333);
        border-radius: 1.2rem;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
        padding: 0.5rem 1.2rem;
        margin: 0.5rem 0;
        max-width: 600px;
        transition: box-shadow 0.2s;
    }
    .hero-card-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: var(--card-title, #fff);
        letter-spacing: 0.02em;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    .hero-card.left {
        margin-left: 0;
        margin-right: auto;
    }
    .hero-card.right {
        margin-left: auto;
        margin-right: 0;
    }
    .hero-card.center {
        margin-left: auto;
        margin-right: auto;
    }
    .hero-card.justify {
        width: 100%;
        max-width: none;
    }
    .read-more {
        margin-top: 0.2rem;
        font-weight: 400;
        font-size: 0.85rem;
    }
    .read-more-right {
        text-align: right;
    }
    .read-more-left {
        text-align: left;
    }
    .read-more-below {
        text-align: center;
    }
    .read-more-link {
        color: var(--card-title, #fff);
        text-decoration: none;
        font-size: 0.88rem;
        transition: color 0.2s;
    }
    .read-more-link:hover {
        color: var(--card-title-hover, #ffd700);
        opacity: 1;
    }
    .read-more-link:hover .hero-card-title {
        color: var(--card-title-hover, #ffd700);
    }
    .arrow {
        display: inline-block;
        margin-left: 0.2em;
        font-size: 1em;
        vertical-align: middle;
    }
</style>
