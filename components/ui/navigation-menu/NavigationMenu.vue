<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        NavigationMenuRoot,
        type NavigationMenuRootEmits,
        type NavigationMenuRootProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'
    import NavigationMenuViewport from './NavigationMenuViewport.vue'

    const props = withDefaults(
        defineProps<
            NavigationMenuRootProps & {
                class?: HTMLAttributes['class']
                viewport?: boolean
            }
        >(),
        {
            viewport: true,
        },
    )
    const emits = defineEmits<NavigationMenuRootEmits>()

    const delegatedProps = reactiveOmit(props, 'class', 'viewport')
    const forwarded = useForwardPropsEmits(delegatedProps, emits)


    const NavigationMenuRootCss = cn(
        [
            'group/navigation-menu',
            'relative',
            "z-10",
            'flex',
            'max-w-max',
            'flex-1',
            'items-center',
            'justify-center',
        ],

        props.class,
    )
</script>

<template>
    <NavigationMenuRoot
        data-slot="navigation-menu"
        :data-viewport="viewport"
        v-bind="forwarded"
        :class="NavigationMenuRootCss"
    >
        <slot />
        <NavigationMenuViewport v-if="viewport" />
    </NavigationMenuRoot>
</template>
