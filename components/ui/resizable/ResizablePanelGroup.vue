<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        SplitterGroup,
        type SplitterGroupEmits,
        type SplitterGroupProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        SplitterGroupProps & { class?: HTMLAttributes['class'] }
    >()
    const emits = defineEmits<SplitterGroupEmits>()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const SplitterGroupCss = cn(
        [
            'flex', //
            'h-full',
            'w-full',
            'data-[orientation=vertical]:flex-col',
        ],

        props.class,
    )
</script>

<template>
    <SplitterGroup
        data-slot="resizable-panel-group"
        v-bind="forwarded"
        :class="SplitterGroupCss"
    >
        <slot />
    </SplitterGroup>
</template>
