<template>
    <div class="divCenterer">
        <slot />
    </div>
</template>

<script lang="ts" setup>
    // TODO: vertical centering not working
</script>

<style scoped>
    .divCenterer {
        display: flex;
        /* Center vertically */
        align-items: center;
        /* Center horizontally */
        justify-content: center;
    }
</style>
