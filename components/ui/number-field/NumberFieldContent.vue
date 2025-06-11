<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()
    const MainCss = cn(
        [
            'relative', //
            '[&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5',
            '[&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5',
        ],

        props.class,
    )
</script>

<template>
    <div :class="MainCss">
        <slot />
    </div>
</template>
