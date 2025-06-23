<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        NavigationMenuViewport,
        type NavigationMenuViewportProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const tailwindClass = cn(
        [
            'origin-top-center',
            'bg-popover',
            'text-popover-foreground',
            'data-[state=open]:animate-in',
            'data-[state=closed]:animate-out',
            'data-[state=closed]:zoom-out-95',
            'data-[state=open]:zoom-in-90',
            'relative',
            'mt-1.5',
            'h-[var(--reka-navigation-menu-viewport-height)]',
            'w-full',
            'overflow-hidden',
            'rounded-md',
            'border',
            'shadow',
            // 'md:w-[var(--reka-navigation-menu-viewport-width)]',
        ],
        props.class,
    )
    const divClass = cn([
        'absolute',
        'top-full',
        'left-0',
        'isolate',
        'z-40',
        'flex',
        'justify-center',
    ])
</script>

<template>
    <div :class="divClass">
        <NavigationMenuViewport
            data-slot="navigation-menu-viewport"
            v-bind="forwardedProps"
            :class="tailwindClass"
        />
    </div>
</template>
