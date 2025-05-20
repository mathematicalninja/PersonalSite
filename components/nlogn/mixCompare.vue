<!-- Takes in a mix of SortAtoms (tagged sorted), and Sort arrays of Atoms (non-recursive). renders the first element of arrays, and all atoms, exposing interaction for sorting, then returns a sort array (tagged sorted) of atoms -->

<script lang="ts" setup>
    import ResultsPile from './resultsPile.vue'
    import {
        isAtom,
        type Atom,
        type SortedArray,
    } from '~/types/nlogn/dataStruct'
    import type { DataId } from '~/types/generics/DataId'
    import type { NlognProps_MixCompare } from '~/types/nlogn/componentProps'

    const props = defineProps<NlognProps_MixCompare<DataId>>()

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
    //     inPiles: Array<SortedArray<DataId> | Atom<DataId>>
    //     gridSize: { x: number; y: number }
    //     dataRenderFunction: (DataId: DataId) => JSX.Element
    //     defaultRenderFunction: () => JSX.Element
    //     renderResultsPile?: Boolean
    //     resultsGrid: {
    //         // Note these give the max values posible
    //         x: number
    //         y?: number
    //     }
    // }>()

    //Shorthand
    const pileArray = props.inPiles

    // Placeholder for return data
    let outArray = { state: 'sorted', data: [] } as SortedArray<DataId>

    // Tracker for which arrays are "done"
    let pileCompleteArray = ref(
        Array(pileArray.length).fill(false) as Array<boolean>,
    )

    // Used only for tracking the depth of **arrays** Atoms handled in pileCompleteArray.
    const pileIndexArray = ref(
        new Array(props.inPiles.length).fill(0) as Array<number>,
    )

    function registerClickAtIndex(idxOuter: number) {
        const element = pileArray[idxOuter]
        if (isAtom(element)) {
            clickAtom(idxOuter)
            return
        }
        clickArray(idxOuter)
        return
    }
    function clickAtom(idxOuter: number) {
        // Atom clicked
        const atom = pileArray[idxOuter] as Atom<DataId>
        pushAtom(atom)
        markPileComplete(idxOuter)
        return
    }

    function pushAtom(atom: Atom<DataId>) {
        outArray.data.push(atom)
    }

    function clickArray(idxOuter: number) {
        // Array clicked
        const array = pileArray[idxOuter] as SortedArray<DataId>
        // current index of the pile
        const idxInner = pileIndexArray.value[idxOuter]
        // the atom that was clicked
        const atom = array.data[idxInner]

        // default element of the pile was clicked. i.e. placeholder
        if (idxInner >= array.data.length) {
            return
        }

        // increment the depth of that pile
        pileIndexArray.value[idxOuter]++

        // add the atom to the outArray
        pushAtom(atom)

        // if the last element of the pile is clicked, "mark" the pile as "done".
        if (pileFinished(idxOuter)) {
            markPileComplete(idxOuter)
        }
    }
    // check if the pile is finished
    function pileFinished(idxOuter: number): boolean {
        const element = pileArray[idxOuter]
        if (isAtom(element)) {
            return true
        }
        return pileIndexArray.value[idxOuter] >= element.data.length
    }

    // mark the pile as finished
    function markPileComplete(idxOuter: number) {
        pileCompleteArray.value[idxOuter] = true
        if (allFinished()) {
            finished.value = true
            outPile.value = outArray.data
        }
    }

    // check if all piles are finished
    function allFinished(): boolean {
        return pileCompleteArray.value.every((val) => val == true)
    }
    // get the atom id from the pile index
    function getAtomIdFromInArray(pileIndex: number): DataId {
        const element = pileArray[pileIndex]
        if (isAtom(element)) {
            return element.data
        }
        return element.data[pileIndexArray.value[pileIndex]].data
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
                    v-if="index < pileArray.length"
                    :key="index * 20 + 20"
                >
                    <NlognClickCard
                        :onClick="() => registerClickAtIndex(index)"
                    >
                        <AlignmentCenterDiv>
                            <RenderDataByDataId
                                v-if="!pileCompleteArray[index]"
                                :key="index * 400 + 400"
                                :dataRenderFunction="props.dataRenderFunction"
                                :DataId="getAtomIdFromInArray(index)"
                                :renderNonDefaultElement="true"
                            />
                        </AlignmentCenterDiv>
                        <AlignmentCenterDiv>
                            <RenderDefaultElement
                                v-if="pileCompleteArray[index]"
                                :key="index * 400 + 401"
                                :dataRenderFunction="
                                    props.defaultRenderFunction
                                "
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
            :resultPile="outArray.data"
            :resultsGrid="props.resultsGrid"
            :resultRenderFunction="props.dataRenderFunction"
        />
    </div>
</template>
<style></style>
