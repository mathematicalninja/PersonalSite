<script setup lang="ts">
    import type { NumberFieldDecrementProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { Minus } from 'lucide-vue-next'
    import { NumberFieldDecrement, useForwardProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        NumberFieldDecrementProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardProps(delegatedProps)
    const NumberFieldDecrementCss = cn(
        [
            'absolute', //
            'top-1/2',
            '-translate-y-1/2',
            'left-0',
            'p-3',
            'disabled:cursor-not-allowed',
            'disabled:opacity-20',
        ],

        props.class,
    )
    const MinusCss = cn([
        'h-4', //
        'w-4',
    ])
</script>

<template>
    <NumberFieldDecrement
        data-slot="decrement"
        v-bind="forwarded"
        :class="NumberFieldDecrementCss"
    >
        <slot>
            <Minus :class="MinusCss" />
        </slot>
    </NumberFieldDecrement>
</template>
