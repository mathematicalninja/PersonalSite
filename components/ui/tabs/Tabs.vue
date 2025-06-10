<script setup lang="ts">
    import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        TabsRootProps & { class?: HTMLAttributes['class'] }
    >()
    const emits = defineEmits<TabsRootEmits>()

    const delegatedProps = reactiveOmit(props, 'class')
    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const TabsRootCss = cn(
        [
            'flex', //
            'flex-col',
            'gap-2',
        ],
        props.class,
    )
</script>

<template>
    <TabsRoot
        data-slot="tabs"
        v-bind="forwarded"
        :class="TabsRootCss"
    >
        <slot />
    </TabsRoot>
</template>
