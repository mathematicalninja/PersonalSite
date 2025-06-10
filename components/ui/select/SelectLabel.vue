<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { SelectLabel, type SelectLabelProps } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        SelectLabelProps & { class?: HTMLAttributes['class'] }
    >()
    const SelectLabelCss = cn(
        [
            'px-2', //
            'py-1.5',
            'text-sm',
            'font-medium',
        ],
        props.class,
    )
</script>

<template>
    <SelectLabel
        data-slot="select-label"
        :class="SelectLabelCss"
    >
        <slot />
    </SelectLabel>
</template>
