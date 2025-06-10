<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import {
        SwitchRoot,
        type SwitchRootEmits,
        type SwitchRootProps,
        SwitchThumb,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    const props = defineProps<
        SwitchRootProps & { class?: HTMLAttributes['class'] }
    >()

    const emits = defineEmits<SwitchRootEmits>()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardPropsEmits(delegatedProps, emits)

    const switchRootCss = cn([
        'peer',

        'data-[state=checked]:bg-success',
        'data-[state=unchecked]:bg-fail/80',

        'dark:data-[state=checked]:bg-success',
        'dark:data-[state=unchecked]:bg-fail/80',

        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',

        'inline-flex',
        'h-[1.15rem]',
        'w-8',
        'shrink-0',
        'items-center',
        'rounded-full',
        'border',
        'border-transparent',
        'shadow-xs',
        'transition-all',
        'outline-none',
        'focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',

        props.class,
    ])
    const switchThumbCss = cn([
        'bg-background',
        'dark:bg-background',

        'pointer-events-none',
        'block',
        'size-4',
        'rounded-full',
        'ring-0',
        'transition-transform',
        'data-[state=checked]:translate-x-[calc(100%-2px)]',
        'data-[state=unchecked]:translate-x-0',
    ])
</script>

<template>
    <SwitchRoot
        data-slot="switch"
        v-bind="forwarded"
        :class="switchRootCss"
    >
        <SwitchThumb
            data-slot="switch-thumb"
            :class="switchThumbCss"
        >
            <AlignmentCenterDiv>
                <slot name="thumb" />
            </AlignmentCenterDiv>
        </SwitchThumb>
    </SwitchRoot>
</template>
