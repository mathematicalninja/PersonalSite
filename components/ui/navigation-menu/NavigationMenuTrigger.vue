<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { ChevronDown } from 'lucide-vue-next'
    import {
        NavigationMenuTrigger,
        type NavigationMenuTriggerProps,
        useForwardProps,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'
    import { navigationMenuTriggerStyle } from '.'

    const props = defineProps<
        NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }
    >()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwardedProps = useForwardProps(delegatedProps)
    const chevronClass = cn(
        cn([
            'relative',
            'top-[1px]',
            'ml-1',
            'size-3',
            'transition',
            'duration-200',
            'group-data-[state=open]:rotate-180',
          ]),
    )
</script>

<template>
    <NavigationMenuTrigger
        data-slot="navigation-menu-trigger"
        v-bind="forwardedProps"
        :class="cn(navigationMenuTriggerStyle(), 'group', props.class)"
    >
        <slot />
        <ChevronDown
            :class="chevronClass"
            aria-hidden="true"
        />
    </NavigationMenuTrigger>
</template>
