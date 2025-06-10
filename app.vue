<template>
    <!-- app.vue -->
    <div :class="$colorMode.value">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
    const colorMode = useColorMode()
</script>
