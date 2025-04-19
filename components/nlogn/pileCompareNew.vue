<!-- Takes in a sort array (tagged unsorted) of sort arrays (tagged sorted) of atoms.
 Sorts the Arrays and then returns a unified sort array (tagged sorted) of atoms -->

<script lang="tsx" setup>
    import type { SortAtom, SortedArray } from '~/types/sorting'
    import type { JSX } from 'vue/jsx-runtime'
    import type { DataStore, idData } from '~/Factory/DataRender'
    import ResultsPile from './resultsPile.vue'

    // Models to return the completed sort, and notify when this element is done sorting.
    const finished = defineModel<boolean>('finished', {
        required: true,
        type: Boolean,
    })
    const outPile = defineModel<Array<SortAtom<idData>>>('outPile', {
        required: true,
        type: Array<SortAtom<idData>>,
    })

    // Props to pass data & rendering methods down from parent.
    const props = defineProps<{
        inPiles: Array<SortedArray<idData>>
        gridSize: { xCount: number; yCount: number }
        dataRenderFunction: (idData: idData) => JSX.Element
        defaultRenderFunction: () => JSX.Element
        renderResultsPile?: Boolean
        resultsGrid: {
            xCount: number
            yCount?: number
        }
    }>()
    const inArrays = props.inPiles //Shorthand
    let outArray = { state: 'sorted', data: [] } as SortedArray<idData> // Placeholder for return data

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
    function getAtomId(pileIndex: number): idData {
        return inArrays[pileIndex].data[pileIndexArray.value[pileIndex]].data
    }

    // computed ref for rendering the results pile
    const displayResults = computed(() => {
        if (props.renderResultsPile) {
            return finished.value
        }
        return false
    })
</script>

<template>
    <div>
        <!-- Sort Grid -->
        <AlignmentNmGrid
            :n="props.gridSize.xCount"
            :m="props.gridSize.yCount"
            v-if="!finished"
        >
            <template #gridItem="{ index }">
                <div
                    v-if="index < inArrays.length"
                    :key="index * 20 + 20"
                >
                    <NlognClickCard :onClick="() => indexArrayOnClick(index)">
                        <AlignmentCenterDiv>
                            <RenderDataById
                                v-if="pileFinished(index) == false"
                                :key="index * 400 + 400"
                                :dataRenderFunction="props.dataRenderFunction"
                                :idData="getAtomId(index)"
                                :renderNonDefaultElement="true"
                            />
                            <RenderDefaultElement
                                v-if="pileFinished(index) == true"
                                :key="index * 400 + 401"
                                :defaultRenderFunction="
                                    props.defaultRenderFunction
                                "
                            />
                        </AlignmentCenterDiv>
                    </NlognClickCard>
                </div>
            </template>
            <!-- Return Display -->
        </AlignmentNmGrid>

        <!-- Results Display -->
        <ResultsPile
            v-if="displayResults"
            :renderWithId="false"
            :resultPile="outArray.data"
            :resultsGrid="props.resultsGrid"
            :resultRenderFunction="props.dataRenderFunction"
        />

        <!-- "undo" pile
     TODO: implement logic
      -->
        <!-- need a "clickOrder" array, tracking idx, then can pop off the most recent idx, find that atom's spot, and return it -->
        <!-- <RenderData
            :key="-1"
            :dataRenderFunction="props.dataRenderFunction"
            :idData="outArray[outArray.length - 1].data"
            :renderNonDefaultElement="true"
        /> -->
    </div>
</template>
<style></style>
