<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { cn } from '~/components/ui/lib/utils'

    interface SkeletonProps {
        class?: HTMLAttributes['class']
    }

    const props = defineProps<SkeletonProps>()
    const skeletonCss = cn(
        [
            'animate-pulse', //
            'rounded-md',
            'bg-primary/10',
        ],
        props.class,
    )
</script>

<template>
    <div
        data-slot="skeleton"
        :class="skeletonCss"
    />
</template>
