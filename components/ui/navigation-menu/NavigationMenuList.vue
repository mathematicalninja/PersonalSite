<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        NavigationMenuList,
        type NavigationMenuListProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        NavigationMenuListProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const NavigationMenuListCss = cn(
        [
            'group',
            'flex',
            'flex-1',
            'list-none',
            'items-center',
            'justify-center',
            'gap-1',
        ],

        props.class,
    )
</script>

<template>
    <NavigationMenuList
        data-slot="navigation-menu-list"
        v-bind="forwardedProps"
        :class="NavigationMenuListCss"
    >
        <slot />
    </NavigationMenuList>
</template>
