<template>
    <span v-if="test.success">
        {{ test.success }}
        {{ test.result }}
    </span>
    <span v-else-if="!test.success">
        {{ test.success }}
        {{ test.error }}
        {{ test.source }}
    </span>
</template>

<script lang="ts" setup>
    import type { Result } from '~/types/generics/result'

    const { test } = defineProps({
        test: {
            type: Object as () => Result<any>,
            required: true,
        },
    })
</script>

<style></style>
