<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        PaginationRoot,
        type PaginationRootEmits,
        type PaginationRootProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        PaginationRootProps & {
            class?: HTMLAttributes['class']
        }
    >()
    const emits = defineEmits<PaginationRootEmits>()

    const delegatedProps = reactiveOmit(props, 'class')
    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const PaginationRootCss = cn(
        [
            'mx-auto', //
            'flex',
            'w-full',
            'justify-center',
        ],
        props.class,
    )
</script>

<template>
    <PaginationRoot
        v-slot="slotProps"
        data-slot="pagination"
        v-bind="forwarded"
        :class="PaginationRootCss"
    >
        <slot v-bind="slotProps" />
    </PaginationRoot>
</template>
