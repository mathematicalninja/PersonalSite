<!-- Takes in a sort array (tagged unsorted) of sort arrays (tagged sorted) of atoms.
 Sorts the Arrays and then returns a unified sort array (tagged sorted) of atoms -->

<script lang="tsx" setup>
    import {
        sorted_ArrayConst,
        type Atom,
        type SortedArray,
    } from '~/types/nlogn/dataStruct'

    import ResultsPile from './resultsPile.vue'
    import type { DataId } from '~/types/generics/DataId'
    import type { NlognProps_PileCompare } from '~/types/nlogn/componentProps'

    const props = defineProps<NlognProps_PileCompare<DataId>>()

    // Models to return the completed sort, and notify when this element is done sorting.
    const finished = defineModel<boolean>('finished', {
        required: true,
        type: Boolean,
    })

    const outPile = defineModel<Array<Atom<DataId>>>('outPile', {
        required: true,
        type: Array<Atom<DataId>>,
    })

    // Props to pass data & rendering methods down from parent.
    // const props = defineProps<{
    //     inPiles: Array<SortedArray<DataId>>
    //     gridSize: { x: number; y: number }
    //     dataRenderFunction: (idData: DataId) => JSX.Element
    //     defaultRenderFunction: () => JSX.Element
    //     renderResultsPile?: Boolean
    //     resultsGrid: {
    //         x: number
    //         y?: number
    //     }
    // }>()
    const inArrays = props.inPiles //Shorthand
    let outArray = { state: sorted_ArrayConst, data: [] } as SortedArray<DataId> // Placeholder for return data

    // Tracker for which arrays are "done"
    let pileCompleteArray = new Array(inArrays.length).fill(
        false,
    ) as Array<boolean>

    // Step 1: create a array holding the "depth" that each pile has been clicked to.
    const pileIndexArray = ref(
        new Array(props.inPiles.length).fill(0) as Array<number>,
    )
    // Step 2: when a pile is clicked, increment the depth of that pile.
    function indexArrayOnClick(idxArray: number) {
        // pile index'd 'idxArray' has been clicked
        const idx = pileIndexArray.value[idxArray] // current index of the pile
        const atom = inArrays[idxArray].data[idx] // the atom that was clicked

        // increment the depth of that pile
        if (idx >= inArrays[idxArray].data.length) {
            // last element of the pile was clicked
        } else {
            pileIndexArray.value[idxArray]++
        }
        // add the atom to the outArray
        outArray.data.push(atom)

        // Step 3: if the last element of the pile is clicked, "mark" the pile as "done".
        if (pileFinished(idxArray)) {
            markFinished(idxArray)
            if (allFinished()) {
                finished.value = true
                outPile.value = outArray.data
            }
        }
    }

    // check if the pile is finished
    function pileFinished(idxArray: number): boolean {
        return pileIndexArray.value[idxArray] >= inArrays[idxArray].data.length
    }

    // mark the pile as finished
    function markFinished(idxArray: number) {
        pileCompleteArray[idxArray] = true
    }

    // check if all piles are finished
    function allFinished(): boolean {
        return pileCompleteArray.every((val) => val == true)
    }

    // get the atom id from the pile index
    function getAtomId(pileIndex: number): DataId {
        return inArrays[pileIndex].data[pileIndexArray.value[pileIndex]].data
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
</script>

<template>
    <div>
        <!-- Sort Grid -->
        <AlignmentXyGrid
            :x="props.grid.x"
            :y="props.grid.y"
            v-if="!finished"
        >
            <template #gridItem="{ index }">
                <div
                    v-if="index < inArrays.length"
                    :key="index * 20 + 20"
                >
                    <NlognClickCard :onClick="() => indexArrayOnClick(index)">
                        <AlignmentCenterDiv>
                            <RenderDataByDataId
                                v-if="pileFinished(index) == false"
                                :key="index * 400 + 400"
                                :dataRenderFunction="props.dataRenderFunction"
                                :DataId="getAtomId(index)"
                                :renderNonDefaultElement="true"
                            />
                            <RenderDefaultElement
                                v-if="pileFinished(index) == true"
                                :key="index * 400 + 401"
                                :dataRenderFunction="
                                    props.defaultRenderFunction
                                "
                            />
                        </AlignmentCenterDiv>
                    </NlognClickCard>
                </div>
            </template>
            <!-- Return Display -->
        </AlignmentXyGrid>

        <!-- Results Display -->
        <ResultsPile
            v-if="displayResults && props.resultsGrid !== undefined"
            :renderWithId="false"
            :resultPile="outArray.data"
            :resultsGrid="props.resultsGrid"
            :resultRenderFunction="props.dataRenderFunction"
        />

        <!-- "undo" pile
  TODO: implement logic
   -->
        <!-- need a "clickOrder" array, tracking idx, then can pop off the most recent idx, find that array's spot, and return the most recently removed atom to it -->
        <!-- <RenderData
         :key="-1"
         :dataRenderFunction="props.dataRenderFunction"
         :idData="outArray[outArray.length - 1].data"
         :renderNonDefaultElement="true"
     /> -->
    </div>
</template>
<style></style>
