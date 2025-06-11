<template>
    <div> </div>
</template>

<script lang="ts" setup>
    import type { DataId } from '~/types/generics/DataId'
    import type { NlogNProps_Recursive_Outer } from '~/types/nlogn/componentProps'

    // 3. Does the Shape of the Grid define the Outer element Size?
    // ====== RenderElement + GoalN ==> OuterShape
    // ---- i.e. Outer.width  = Grid.x * Element.width
    // ---- and  Outer.height = Grid.y * Element.height

    const props = defineProps<NlogNProps_Recursive_Outer<DataId>>()
</script>

<style></style>
