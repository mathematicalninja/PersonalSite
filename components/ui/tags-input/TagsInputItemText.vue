<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        TagsInputItemText,
        type TagsInputItemTextProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        TagsInputItemTextProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const TagsInputItemTextCss = cn(
        [
            'py-0.5', //
            'px-2',
            'text-sm',
            'rounded',
            'bg-transparent',
        ],
        props.class,
    )
</script>

<template>
    <TagsInputItemText
        v-bind="forwardedProps"
        :class="TagsInputItemTextCss"
    />
</template>
