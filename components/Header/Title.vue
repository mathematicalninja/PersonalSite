<script setup lang="ts">
    import { cn } from '../ui/lib'

    const cardClass = cn([
        'bg-primary', //
        'pb-2',
        'pr-2',
        'mb-1',
    ])
    const nameClass = cn([
        'font-outline-4',
        'text-primary-foreground',
        'px-2', //
        'pt-2',
        'text-4xl',
    ])
</script>

<template>
    <QCard :class="cardClass">
        <div :class="nameClass"> Alex Duncan </div>
        <HeaderTagline />
    </QCard>
</template>

<style scoped></style>
