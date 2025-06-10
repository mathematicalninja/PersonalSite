<template>
    <div> </div>
</template>

<script lang="ts" setup>
    import type { DataId } from '~/types/generics/DataId'
    import type { NlogNProps_Recursive_Grid } from '~/types/nlogn/componentProps'

    // 2. Does the Outer element Size define the shape of the Grid?
    // ===== RenderElementSize + OuterShape {{+ MaxN}} ==> Grid
    // ---- i.e. GoalN = product of {maximum number of elements that can fit inside the outer element in each direction.}

    const props = defineProps<NlogNProps_Recursive_Grid<DataId>>()
</script>

<style></style>
