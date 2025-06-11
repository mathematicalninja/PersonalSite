<script lang="ts" setup>
    import type { DataId } from '~/types/generics/DataId'
    import type { NlogNProps_Recursive } from '~/types/nlogn/componentProps'

    import { firstUnsorted } from '~/utils/array/nlognFirstUnsorted'

    // inputs change behaviour:
    // 1. is the input pile pre-organised or a raw data array?

    // 2. Does the Outer element Size define the shape of the Grid?
    // ===== RenderElementSize + OuterShape {{+ MaxN}} ==> Grid
    // ---- i.e. GoalN = product of {maximum number of elements that can fit inside the outer element in each direction.}

    // 3. Does the Shape of the Grid define the Outer element Size?
    // ====== RenderElement + GoalN ==> OuterShape
    // ---- i.e. Outer.width  = Grid.x * Element.width
    // ---- and  Outer.height = Grid.y * Element.height

    // 4. IF the render elements have a mutable size:
    // ====== GoalN + OuterShape ==> RenderElement

    // choose 2 from {Grid, OuterShape, RenderElementSize} as fixed, use this to calculate the third.
    const props = withDefaults(defineProps<NlogNProps_Recursive<DataId>>(), {
        mode: 'grid',
    })
    const firstIndex = computed(() => {
        return firstUnsorted(props.inPiles)
    })
    const needToRecur = computed(() => {
        return firstIndex.value >= 0
    })
    // <FullRecursion
    // v-if="needToRecur"
    // :grid="props.grid"
    // :dataRenderFunction="props.dataRenderFunction"
    // :defaultRenderFunction="props.defaultRenderFunction"
    // :mode="props.mode"
    // :inPiles="props.inPiles[firstIndex]"
    // :renderResultsPile=""
    // :resultsGrid=""
    // :class=""
    // />
</script>

<template>
    <div v-if="!needToRecur" />
    <div v-else>
        <!-- <NlogNRecursionCalculateExact
            v-if="props.mode == 'exact'"
            v-bind="props"
        /> -->
        <CalculateGrid
            v-if="props.mode == 'grid'"
            v-bind="props"
        />
        <CalculateInner
            v-else-if="props.mode == 'inner'"
            v-bind="props"
        />
        <CalculateOuter
            v-else-if="props.mode == 'outer'"
            v-bind="props"
        />
        <div v-else>Invalid mode: {{ props.mode }}</div>
    </div>
</template>

<style></style>
