<script setup lang="ts">
    import { cn } from '~/components/ui/lib/utils'
    import { Primitive, type PrimitiveProps } from 'reka-ui'

    import { type ContainerVariants, containerVariants } from '.'
    import type { HTMLAttributes } from 'vue'

    interface Props extends PrimitiveProps {
        variant?: ContainerVariants['variant']
        border?: ContainerVariants['border']
        padded?: ContainerVariants['padded']
        class?: HTMLAttributes['class']
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div',
    })
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn(containerVariants({ variant }), props.class)"
    >
        <slot />
    </Primitive>
</template>
