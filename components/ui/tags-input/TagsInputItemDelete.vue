<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { X } from 'lucide-vue-next'
    import {
        TagsInputItemDelete,
        type TagsInputItemDeleteProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const TagsInputItemDeleteCss = cn(
        [
            'flex', //
            'rounded',
            'bg-transparent',
            'mr-1',
        ],
        props.class,
    )
</script>

<template>
    <TagsInputItemDelete
        v-bind="forwardedProps"
        :class="TagsInputItemDeleteCss"
    >
        <slot>
            <X class="w-4 h-4" />
        </slot>
    </TagsInputItemDelete>
</template>
