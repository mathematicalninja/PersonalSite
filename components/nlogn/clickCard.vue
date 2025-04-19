<script setup lang="ts">
    import { UContainer } from '#components'

    const props = defineProps({
        onClick: {
            type: Function,
            required: true,
        },
    })
</script>

<template>
    <div @click="() => onClick()">
        <UContainer style="padding: 0%">
            <slot />
        </UContainer>
    </div>
</template>

<style scoped></style>
