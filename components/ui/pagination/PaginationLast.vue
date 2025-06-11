<script setup lang="ts">
    import type { PaginationLastProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { ChevronRightIcon } from 'lucide-vue-next'
    import { PaginationLast, useForwardProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'
    import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

    const props = withDefaults(
        defineProps<
            PaginationLastProps & {
                size?: ButtonVariants['size']
                class?: HTMLAttributes['class']
            }
        >(),
        {
            size: 'default',
        },
    )

    const delegatedProps = reactiveOmit(props, 'class', 'size')
    const forwarded = useForwardProps(delegatedProps)

    const PaginationLastCss = cn(
        buttonVariants({ variant: 'ghost', size: props.size }),
        [
            'gap-1', //
            'px-2.5',
            'sm:pr-2.5',
        ],
        props.class,
    )
</script>

<template>
    <PaginationLast
        data-slot="pagination-last"
        :class="PaginationLastCss"
        v-bind="forwarded"
    >
        <slot>
            <span class="hidden sm:block">Last</span>
            <ChevronRightIcon />
        </slot>
    </PaginationLast>
</template>
