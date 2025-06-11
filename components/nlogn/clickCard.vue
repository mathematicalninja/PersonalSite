<script setup lang="ts">
    const props = defineProps<{ onClick: () => void }>()
</script>

<template>
    <div @click="() => onClick()">
        <QContainer
            style="padding: 0%"
            variant="blend"
        >
            <slot />
        </QContainer>
    </div>
</template>

<style scoped></style>
