<script setup lang="ts">
    import { cn } from '../ui/lib'

    const mainClass = cn(['bg-background'])
</script>

<template>
    <QContainer :class="mainClass">
        <!-- <h1>component: Header.vue</h1> -->
        <HeaderTitle />
        <HeaderNavigation />
    </QContainer>
</template>

<style scoped></style>
