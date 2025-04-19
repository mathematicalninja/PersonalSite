<template>
    <div>
        {{ props.dataRenderFunction() }}
    </div>
</template>

<script lang="tsx" setup>
    import type { JSX } from 'vue/jsx-runtime'
    const props = defineProps<{
        dataRenderFunction: () => JSX.Element
    }>()

    // // ~~~ Psuedo code for renderFunction ~~~
    // function renderFunction() {
    //     return <div>{{ defaultData }}</div>
    // }
</script>

<style></style>
