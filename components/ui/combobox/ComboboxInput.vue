<script setup lang="ts">
    import type { HTMLAttributes } from 'vue'
    import { reactiveOmit } from '@vueuse/core'
    import { SearchIcon } from 'lucide-vue-next'
    import {
        ComboboxInput,
        type ComboboxInputEmits,
        type ComboboxInputProps,
        useForwardPropsEmits,
    } from 'reka-ui'
    import { cn } from '~/components/ui/lib/utils'

    defineOptions({
        inheritAttrs: false,
    })

    const props = defineProps<
        ComboboxInputProps & {
            class?: HTMLAttributes['class']
        }
    >()

    const emits = defineEmits<ComboboxInputEmits>()

    const delegatedProps = reactiveOmit(props, 'class')

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
    const mainCss = cn([
        'flex', //
        'h-9',
        'items-center',
        'gap-2',
        'border-b',
        'px-3',
    ])
    const IconCss = cn([
        'size-4', //
        'shrink-0',
        'opacity-50',
    ])
    const InputCss = cn(
        [
            'placeholder:text-muted-foreground', //
            'flex',
            'h-10',
            'w-full',
            'rounded-md',
            'bg-transparent',
            'py-3',
            'text-sm',
            'outline-hidden',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
        ],
        props.class,
    )
</script>

<template>
    <div
        data-slot="command-input-wrapper"
        :class="mainCss"
    >
        <SearchIcon :class="InputCss" />
        <ComboboxInput
            data-slot="command-input"
            :class="IconCss"
            v-bind="{ ...forwarded, ...$attrs }"
        >
            <slot />
        </ComboboxInput>
    </div>
</template>
