<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { MoreHorizontal } from 'lucide-vue-next'
    import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        PaginationEllipsisProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')
    const PaginationEllipsisCss = cn(
        [
            'flex', //
            'size-9',
            'items-center',
            'justify-center',
        ],

        props.class,
    )
</script>

<template>
    <PaginationEllipsis
        data-slot="pagination-ellipsis"
        v-bind="delegatedProps"
        :class="PaginationEllipsisCss"
    >
        <slot>
            <MoreHorizontal class="size-4" />
            <span class="sr-only">More pages</span>
        </slot>
    </PaginationEllipsis>
</template>
