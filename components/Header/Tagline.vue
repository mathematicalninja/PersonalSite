<script setup lang="ts">
    import { cn } from '../ui/lib'

    const tagClass = cn([
        'text-accent-text', //
        'justify-items-end', //
        'text-lg',
        'px-2',
    ])
</script>

<template>
    <div :class="tagClass">
        <div />
        <!-- <div>Component: Header/tagline</div> -->
        <div>Mathematics is an Artform.</div>
    </div>
</template>

<style scoped></style>
