<script lang="ts" setup>
    import type { RenderMarkdownProps } from '~/types/component/renderProps'
    import { cn } from '../ui/lib/utils'

    const props = withDefaults(defineProps<RenderMarkdownProps>(), {
        alignment: 'left',
    })
    const innerClass = cn([
        'text-3xl',
        'font-bold',
        'mb-6',
        'text-[var(--card-title,#fff)]',
        'tracking-wide',
        'drop-shadow-sm',
    ])
    const divClass = cn([
        'prose',
        'prose-invert',
        'max-w-none',
        'bg-card',
        'rounded-xl',
        'p-4',
        'md:p-6',
        'text-card-foreground',
    ])
</script>

<template>
    <div :class="divClass">
        <div
            v-if="props.markdown.data.title"
            :class="innerClass"
        >
            {{ props.markdown.data.title }}
        </div>
        <MDC :value="props.markdown.content" />
    </div>
</template>
