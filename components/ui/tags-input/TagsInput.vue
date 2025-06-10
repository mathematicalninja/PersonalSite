<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        TagsInputRoot,
        type TagsInputRootEmits,
        type TagsInputRootProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        TagsInputRootProps & { class?: HTMLAttributes['class'] }
    >()
    const emits = defineEmits<TagsInputRootEmits>()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const TagsInputRootCss = cn(
        [
            'flex', //
            'flex-wrap',
            'gap-2',
            'items-center',
            'rounded-md',
            'border',
            'border-input',
            'bg-background',
            'px-3',
            'py-1.5',
            'text-sm',
        ],
        props.class,
    )
</script>

<template>
    <TagsInputRoot
        v-bind="forwarded"
        :class="TagsInputRootCss"
    >
        <slot />
    </TagsInputRoot>
</template>
