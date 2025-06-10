<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { ChevronDown } from 'lucide-vue-next'
    import {
        SelectScrollDownButton,
        type SelectScrollDownButtonProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const SelectScrollDownButtonCss = cn(
        [
            'flex', //
            'cursor-default',
            'items-center',
            'justify-center',
            'py-1',
        ],
        props.class,
    )
</script>

<template>
    <SelectScrollDownButton
        data-slot="select-scroll-down-button"
        v-bind="forwardedProps"
        :class="SelectScrollDownButtonCss"
    >
        <slot>
            <ChevronDown class="size-4" />
        </slot>
    </SelectScrollDownButton>
</template>
