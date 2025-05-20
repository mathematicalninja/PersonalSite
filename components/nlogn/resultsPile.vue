<script lang="tsx" setup>
    import type { JSX } from 'vue/jsx-runtime'
    import type { NlognProps_Results } from '~/types/nlogn/componentProps'
    import type { DataId } from '~/types/generics/DataId'
    import type { RenderById } from '~/types/layout/rendering'

    import RenderDataByNumber from '../Render/dataByNumber'
    import RenderDataByString from '../Render/dataByString'

    const props = defineProps<NlognProps_Results<DataId>>()

    const calcY = computed(() => {
        let y: number
        if (props.resultsGrid.y) {
            y = props.resultsGrid.y
        } else {
            y = Math.ceil(props.resultPile.length / props.resultsGrid.x)
        }
        return y
    })

    function getIdByIndex(idx: number) {
        return props.resultPile[idx].data
    }

    function renderByIndexOptionalTag(idxResult: number): RenderById<DataId> {
        if (!props.renderWithId) {
            return props.resultRenderFunction as RenderById<DataId>
        }
        return (DataId: DataId) => {
            return props.resultRenderFunction(DataId, idxResult)
        }
    }
</script>

<template>
    <div>
        <AlignmentXyGrid
            :x="props.resultsGrid.x"
            :y="calcY"
        >
            <template #gridItem="{ index }">
                <div
                    v-if="index < resultPile.length"
                    :key="'resultsPile Row' + index"
                >
                    <AlignmentCenterDiv>
                        <RenderDataByDataId
                            :key="'resultsPile Col' + index"
                            :dataRenderFunction="
                                renderByIndexOptionalTag(index)
                            "
                            :DataId="getIdByIndex(index)"
                        />
                    </AlignmentCenterDiv>
                </div>
            </template>
        </AlignmentXyGrid>
    </div>
</template>

<style></style>
