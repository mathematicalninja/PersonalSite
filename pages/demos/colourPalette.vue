<script setup lang="tsx">
    import { cn } from '~/components/ui/lib/utils'
    const block = [
        'rounded-xl',
        'border-1',
        'border-border',
        'shadow-lg',
        'p-2',
        'md:p-5',
        'my-2',
        'max-w-xl',
        'transition-shadow',
    ]
    const backgroundCss = cn([
        'text-background-foreground',
        'dark:text-background-foreground',
        'bg-background',
        'dark:bg-background',
        block,
    ])
    const primaryCss = cn([
        'text-primary-foreground', //
        'dark:text-primary-foreground', //
        'bg-primary',
        'dark:bg-primary',
        block,
    ])
    const secondaryCss = cn([
        'text-secondary-foreground',
        'dark:text-secondary-foreground',
        'bg-secondary',
        'dark:bg-secondary',
        block,
    ])
    const accentCss = cn([
        'text-accent-foreground', //
        'dark:text-accent-foreground', //
        'bg-accent',
        'dark:bg-accent',
        block,
    ])
    const cardCss = cn([
        'text-card-foreground', //
        'dark:text-card-foreground', //
        'bg-card',
        'dark:bg-card',
        block,
    ])
    // TODO: #124 add in dark mode column to colourPallet.vue
</script>

<script lang="tsx">
    const accentTest = cn(['text-accent'])
    const Accent = h('div', {
        class: accentTest,
        innerHTML:
            '| | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | | |  ',
    })
</script>

<template>
    <QContainer :class="primaryCss">Primary Text Colours<Accent /></QContainer>
    <QContainer :class="secondaryCss"
        >Secondary Text Colours<Accent
    /></QContainer>
    <QContainer :class="cardCss">Card Text Colours<Accent /></QContainer>
    <QContainer :class="backgroundCss"
        >Background Text Colours <Accent
    /></QContainer>
    <QContainer :class="accentCss">Accent Text Colours<Accent /></QContainer>
</template>

<style scoped></style>
