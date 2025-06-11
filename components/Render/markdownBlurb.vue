<script lang="ts" setup>
    import type { RenderMarkdownProps } from '~/types/component/renderProps'

    const props = withDefaults(defineProps<RenderMarkdownProps>(), {
        alignment: 'center',
    })
    const alignment = props.alignment
    const readMoreAlign =
        alignment === 'left' || 'right' ? alignment : 'text-center'
    // const cardTitle = palette.fuchsia // Secondary foreground
    // const cardBg = palette.slate // secondary
    // const cardTitleHover = palette.gold //accent

    const divClass = [
        'bg-card',
        'text-card-foreground',
        'rounded-xl',
        'border',
        'border-yellow-400',
        'shadow-lg',
        'p-2',
        'md:p-5',
        'my-2',
        'max-w-xl',
        'transition-shadow',
    ]

    const titleClass = [
        'text-2xl',
        'font-bold',
        'mb-4',
        'text-card-foreground',
        'tracking-wide',
        'drop-shadow-sm',
        'transition-colors',
        'duration-400',
        'hover:text-accent',
    ]
    const linkClass = [
        'text-card-foreground',
        'read-more-link',
        'no-underline',
        'transition-colors',
        'duration-100',
        'hover:text-accent',
    ]
</script>

<template>
    <div
        :class="[
            divClass,
            alignment === 'left'
                ? 'ml-0 mr-auto'
                : alignment === 'right'
                  ? 'ml-auto mr-0'
                  : alignment === 'center'
                    ? 'mx-auto'
                    : '',
            alignment === 'justify' ? 'w-full max-w-none' : '',
        ]"
    >
        <NuxtLink
            :to="props.link"
            class="read-more-link"
        >
            <div
                v-if="props.markdown.data.title"
                :class="titleClass"
            >
                {{ props.markdown.data.title }}
            </div>
        </NuxtLink>
        <MDC
            v-if="props.markdown.data.blurb"
            :value="props.markdown.data.blurb"
        />
        <div
            v-if="props.link"
            :class="['mt-1 font-normal text-sm', readMoreAlign]"
        >
            <NuxtLink
                :to="props.link"
                :class="linkClass"
            >
                Read more
                <span class="inline-block ml-1 align-middle">&rarr;</span>
            </NuxtLink>
        </div>
    </div>
</template>

<!-- All styling is now handled by Tailwind classes above. -->
