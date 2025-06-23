<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        NavigationMenuLink,
        type NavigationMenuLinkEmits,
        type NavigationMenuLinkProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    // const props = defineProps<
    //     NavigationMenuLinkProps & { class?: HTMLAttributes['class'] }
    // >()
    const props = withDefaults(
        defineProps<
            NavigationMenuLinkProps & { class?: HTMLAttributes['class'] }
        >(),
        { asChild: true },
    )
    const emits = defineEmits<NavigationMenuLinkEmits>()

    const delegatedProps = reactiveOmit(props, 'class')
    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const tailwindClass = cn(
        [
            'ring-ring/10',
            'outline-ring/50',
            'flex',
            'flex-col',
            'gap-1',
            'rounded-sm',
            'p-2',
            'text-sm',
            'transition-[color,box-shadow]',
            'focus-visible:ring-4',
            'focus-visible:outline-1',

            'data-[active=true]:focus:bg-accent',
            'data-[active=true]:hover:bg-accent',
            'data-[active=true]:bg-accent/50',
            'data-[active=true]:text-accent-foreground',

            "[&_svg:not([class*='text-'])]:text-muted-foreground",
            "[&_svg:not([class*='size-'])]:size-4",

            'hover:bg-accent',
            'hover:text-accent-foreground',

            'focus:bg-accent',
            'focus:text-accent-foreground',

            'dark:ring-ring/20',
            'dark:outline-ring/40',

        ],
        props.class,
    )
</script>

<template>
    <NavigationMenuLink
        data-slot="navigation-menu-link"
        v-bind="forwarded"
        :class="{ tailwindClass }"
    >
        <slot />
    </NavigationMenuLink>
</template>
