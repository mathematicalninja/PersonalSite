<script setup lang="ts">
    import type { PaginationPrevProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { ChevronLeftIcon } from 'lucide-vue-next'
    import { PaginationPrev, useForwardProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'
    import { buttonVariants, type ButtonVariants } from '@/components/ui/button'

    const props = withDefaults(
        defineProps<
            PaginationPrevProps & {
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

    const PaginationPrevCss = cn(
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
    <PaginationPrev
        data-slot="pagination-previous"
        :class="PaginationPrevCss"
        v-bind="forwarded"
    >
        <slot>
            <ChevronLeftIcon />
            <span class="hidden sm:block">Previous</span>
        </slot>
    </PaginationPrev>
</template>
