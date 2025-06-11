<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        ScrollAreaScrollbar,
        type ScrollAreaScrollbarProps,
        ScrollAreaThumb,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = withDefaults(
        defineProps<
            ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }
        >(),
        {
            orientation: 'vertical',
        },
    )

    const delegatedProps = reactiveOmit(props, 'class')
    const ScrollAreaScrollbarCss = cn(
        'flex touch-none p-px transition-colors select-none',
        props.orientation === 'vertical' && [
            'h-full', //
            'w-2.5',
            'border-l',
            'border-l-transparent',
        ],
        props.orientation === 'horizontal' && [
            'h-2.5', //
            'flex-col',
            'border-t',
            'border-t-transparent',
        ],

        props.class,
    )
    const ScrollAreaThumbCss = cn([
        'bg-border', //
        'relative',
        'flex-1',
        'rounded-full',
    ])
</script>

<template>
    <ScrollAreaScrollbar
        data-slot="scroll-area-scrollbar"
        v-bind="delegatedProps"
        :class="ScrollAreaScrollbarCss"
    >
        <ScrollAreaThumb
            data-slot="scroll-area-thumb"
            :class="ScrollAreaThumbCss"
        />
    </ScrollAreaScrollbar>
</template>
