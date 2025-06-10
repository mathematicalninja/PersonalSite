<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { PaginationListItem, type PaginationListItemProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'
    import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

    const props = withDefaults(
        defineProps<
            PaginationListItemProps & {
                size?: ButtonVariants['size']
                class?: HTMLAttributes['class']
                isActive?: boolean
            }
        >(),
        {
            size: 'icon',
        },
    )

    const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive')
    const PaginationListItemCss = cn(
        buttonVariants({
            variant: props.isActive ? 'outline' : 'ghost',
            size: props.size,
        }),
        props.class,
    )
</script>

<template>
    <PaginationListItem
        data-slot="pagination-item"
        v-bind="delegatedProps"
        :class="PaginationListItemCss"
    >
        <slot />
    </PaginationListItem>
</template>
