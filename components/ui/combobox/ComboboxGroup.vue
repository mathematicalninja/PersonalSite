<script setup lang="ts">
    import type { ComboboxGroupProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { ComboboxGroup, ComboboxLabel } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        ComboboxGroupProps & {
            class?: HTMLAttributes['class']
            heading?: string
        }
    >()

    const delegatedProps = reactiveOmit(props, 'class')
    const labelCss = cn([
        'px-2', //
        'py-1.5',
        'text-xs',
        'font-medium',
        'text-muted-foreground',
    ])

    const groupCss = cn(
        [
            'overflow-hidden', //
            'p-1',
            'text-foreground',
        ],

        props.class,
    )
</script>

<template>
    <ComboboxGroup
        data-slot="combobox-group"
        v-bind="delegatedProps"
        :class="groupCss"
    >
        <ComboboxLabel
            v-if="heading"
            :class="labelCss"
        >
            {{ heading }}
        </ComboboxLabel>
        <slot />
    </ComboboxGroup>
</template>
