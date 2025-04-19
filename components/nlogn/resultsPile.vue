<script lang="tsx" setup>
    import type { DataStore, idData, RenderById } from '~/Factory/DataRender'
    import type { SortAtom } from '~/types/sorting'
    import type { JSX } from 'vue/jsx-runtime'

    type resultRenderFunction =
        | ((idData: idData) => JSX.Element)
        | ((idData: idData, idxResult: number) => JSX.Element)

    const props = defineProps<{
        renderWithId?: boolean
        resultPile: Array<SortAtom<idData>>
        resultsGrid: {
            xCount: number
            yCount?: number
        }
        resultRenderFunction: resultRenderFunction
    }>()

    const calcY = computed(() => {
        let yCount: number
        if (props.resultsGrid.yCount) {
            yCount = props.resultsGrid.yCount
        } else {
            yCount = Math.ceil(
                props.resultPile.length / props.resultsGrid.xCount,
            )
        }
        return yCount
    })

    function getIdByIndex(idx: number) {
        return props.resultPile[idx].data
    }

    function renderByIndexOptionalTag(idxResult: number): RenderById {
        if (!props.renderWithId) {
            return props.resultRenderFunction as RenderById
        }
        return (idData: idData) => {
            return props.resultRenderFunction(idData, idxResult)
        }
    }
</script>

<template>
    <div>
        <AlignmentNmGrid
            :n="props.resultsGrid.xCount"
            :m="calcY"
        >
            <template #gridItem="{ index }">
                <div
                    v-if="index < resultPile.length"
                    :key="'resultsPile Row' + index"
                >
                    <AlignmentCenterDiv>
                        <RenderDataById
                            :key="'resultsPile Col' + index"
                            :dataRenderFunction="
                                renderByIndexOptionalTag(index)
                            "
                            :idData="getIdByIndex(index)"
                            :renderNonDefaultElement="true"
                        />
                    </AlignmentCenterDiv>
                </div>
            </template>
        </AlignmentNmGrid>
    </div>
</template>

<style></style>
