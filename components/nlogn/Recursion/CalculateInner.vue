<template>
    <div> </div>
</template>

<script lang="ts" setup>
    import type { DataId } from '~/types/generics/DataId'
    import type { NlogNProps_Recursive_Inner } from '~/types/nlogn/componentProps'

    // 4. IF the render elements have a mutable size:
    // ====== GoalN + OuterShape ==> RenderElement

    const props = defineProps<NlogNProps_Recursive_Inner<DataId>>()
</script>

<style></style>
