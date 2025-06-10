<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        ProgressIndicator,
        ProgressRoot,
        type ProgressRootProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = withDefaults(
        defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(),
        {
            modelValue: 0,
        },
    )

    const delegatedProps = reactiveOmit(props, 'class')
    const ProgressRootCss = cn(
        [
            'bg-primary/20', //
            'relative',
            'h-2',
            'w-full',
            'overflow-hidden',
            'rounded-full',
        ],
        props.class,
    )
    const ProgressIndicatorCss = cn([
        'bg-primary', //
        'h-full',
        'w-full',
        'flex-1',
        'transition-all',
    ])
</script>

<template>
    <ProgressRoot
        data-slot="progress"
        v-bind="delegatedProps"
        :class="ProgressRootCss"
    >
        <ProgressIndicator
            data-slot="progress-indicator"
            :class="ProgressIndicatorCss"
            :style="`transform: translateX(-${
                100 - (props.modelValue ?? 0)
            }%);`"
        />
    </ProgressRoot>
</template>
