<script setup lang="ts">
    import { default as Sw } from './Switch.vue'

    const colorMode = useColorMode()
    const isDark = computed({
        get() {
            return colorMode.value === 'dark'
        },
        set(_isDark) {
            colorMode.preference = _isDark ? 'dark' : 'light'
        },
    })

    const toggleTheme = (val: boolean) => {
        const current = colorMode.value
        if (val && current !== 'dark') {
            colorMode.preference = 'dark'
        } else if (!val && current !== 'light') {
            colorMode.preference = 'light'
        }
    }

    // BUG: the switch icon resets its position when navigating to a new page (without changing the theme mode)
</script>

<template>
    <Sw
        :model-value="isDark"
        @update:model-value="toggleTheme"
    >
        <template #thumb>
            <Icon
                v-if="!isDark"
                name="lucide:sun"
            />
            <Icon
                v-else
                name="lucide:moon"
            />
        </template>
    </Sw>
</template>
