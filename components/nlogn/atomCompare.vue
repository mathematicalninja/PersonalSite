<!-- Takes in an array of sort atoms.
 Sorts the atoms and then returns a unified **array** of atoms -->

<script lang="tsx" setup>
    import type { Atom } from '~/types/nlogn/dataStruct'
    import ResultsPile from './resultsPile.vue'
    import type { NlognProps_AtomCompare } from '~/types/nlogn/componentProps'
    import type { DataId } from '~/types/generics/DataId'

    const props = defineProps<NlognProps_AtomCompare<DataId>>()

    // Models to return the completed sort, and notify when this element is done sorting.
    const finished = defineModel<boolean>('finished', {
        required: true,
        type: Boolean,
    })
    const outPile = defineModel<Array<Atom<DataId>>>('outPile', {
        required: true,
        type: Array<Atom<DataId>>,
    })

    const inArray = props.inPile //Shorthand

    let outArray = [] as Array<Atom<DataId>> //Placeholder for return data

    // Tracker for which atoms are "done"
    const emptyIndexArray = ref(
        new Array(inArray.length).fill(false) as Array<boolean>,
    )

    // Records an atom as "done"
    function emptyIndex(index: number) {
        outArray.push(inArray[index])
        emptyIndexArray.value[index] = true
    }

    // Checks that all atoms are "done"
    function allIndexEmpty() {
        // Note: I know index is not a plural name, but it reads cleaner in the code.
        return emptyIndexArray.value.every((val) => val == true)
    }

    // computed ref for rendering the results pile
    const displayResults = computed(() => {
        if (props.resultsGrid == undefined) {
            return false
        }
        if (props.renderResultsPile) {
            return finished.value
        }
        return false
    })

    // Handles an atom being clicked.
    function clickAtom(idx: number) {
        if (emptyIndexArray.value[idx] == false) {
            emptyIndex(idx)
            if (allIndexEmpty()) {
                //final atom clicked
                finished.value = true
                outPile.value = outArray
            }
        }
    }
    function getAtomIdByInArrayIndex(arrayIdx: number): DataId {
        return inArray[arrayIdx].data
    }
</script>

<template>
    <!-- Sort Grid -->
    <AlignmentXyGrid
        :x="props.grid.x"
        :y="props.grid.y"
        v-if="!finished"
    >
        <template #gridItem="{ index }">
            <div
                v-if="index < inArray.length"
                :key="index * 20 + 20"
            >
                <NlognClickCard :onClick="() => clickAtom(index)">
                    <AlignmentCenterDiv>
                        <RenderDataByDataId
                            v-if="emptyIndexArray[index] == false"
                            :key="index * 400 + 400"
                            :dataRenderFunction="props.dataRenderFunction"
                            :DataId="getAtomIdByInArrayIndex(index)"
                            :renderNonDefaultElement="true"
                        />
                        <RenderDefaultElement
                            v-if="emptyIndexArray[index] == true"
                            :key="index * 400 + 401"
                            :dataRenderFunction="props.defaultRenderFunction"
                        />
                    </AlignmentCenterDiv>
                </NlognClickCard>
            </div>
        </template>
    </AlignmentXyGrid>

    <!-- Results Display -->
    <ResultsPile
        v-if="displayResults && props.resultsGrid !== undefined"
        :renderWithId="false"
        :resultPile="outArray"
        :resultsGrid="props.resultsGrid"
        :resultRenderFunction="props.dataRenderFunction"
    />

    <!-- "undo" pile
    TODO: implement logic
    -->
    <!-- need a "clickOrder" array, tracking idx, then can pop off the most recent idx, find that atom's spot, and return it -->
    <!-- <RenderData
        v-if="atLeastOneClick()"
        :key="-1"
        :dataRenderFunction="props.dataRenderFunction"
        :idData="outArray[outArray.length - 1].data"
        :renderNonDefaultElement="true"
    /> -->
</template>

<style></style>
