<script setup lang="ts">
    import type { NumberFieldIncrementProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { Plus } from 'lucide-vue-next'
    import { NumberFieldIncrement, useForwardProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        NumberFieldIncrementProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardProps(delegatedProps)
    const NumberFieldIncrementCss = cn(
        [
            'absolute', //
            'top-1/2',
            '-translate-y-1/2',
            'right-0',
            'disabled:cursor-not-allowed',
            'disabled:opacity-20',
            'p-3',
        ],

        props.class,
    )
    const PlusCss = cn([
        'h-4', //
        'w-4',
    ])
</script>

<template>
    <NumberFieldIncrement
        data-slot="increment"
        v-bind="forwarded"
        :class="NumberFieldIncrementCss"
    >
        <slot>
            <Plus :class="PlusCss" />
        </slot>
    </NumberFieldIncrement>
</template>
