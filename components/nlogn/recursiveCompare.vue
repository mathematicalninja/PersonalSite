<template>
    <div> </div>
</template>

<script lang="tsx" setup>
    // TODO:
    // !IMPORTANT
    // convert most of theis to a <SetupRecursion> component.

    import type { JSX } from 'vue/jsx-runtime'
    import type { DataId } from '~/types/generics/DataId'
    import type { GridCount } from '~/types/layout/grid'
    import type {
        Atom,
        NlognElement,
        renderableSortPile,
        SortedArray,
    } from '~/types/nlogn/dataStruct'

    // TODO: pass in a data structure, that holds the original data sort structure & state tag.
    // Use this state tag to determine where to *start* the process.

    const props = defineProps<{
        inPiles: Array<SortedArray<DataId>> // note that this could be a recursive array or a data array that needs to be converted into a recursive array ==> This is the **wrong type**
        compareCap: number // note that this can be used to calculate x & y
        dataRenderFunction: (idData: DataId) => JSX.Element
        defaultRenderFunction: () => JSX.Element
        vueSize: { width: number; height: number }
        elementSize: { width: number; height: number }
        dontRenderResultsPile?: Boolean
        dontAllowUndo?: Boolean
        resultsGrid: {
            x: number
            y?: number
        }
    }>()

    function getGridSize(
        elementSize: { width: number; height: number },
        vueSize: { width: number; height: number },
        compareCap: number,
    ): GridCount {
        // using the vueSize calculate the size of each compare element that can be fit in the vue
        const gridCount = ExactRectangleFitViaSquare(
            elementSize,
            vueSize,
            compareCap,
        ).gridCount

        return gridCount
    }
    const grid: GridCount = getGridSize(
        props.elementSize,
        props.vueSize,
        props.compareCap,
    )

    // TODO: allow the passing of a scale factor into render functions, to scale to fit a grid.
    // **OR** allow the forcing of ScaleFactor == 1 and calculate grid size based on that.
    // Note: this still needs the passing in of elementSize.

    // TODO: create a scalableRenderFactory.

    const outpile = defineModel<Array<Atom<DataId>>>('outPile', {
        required: true,
        type: Array<Atom<DataId>>,
    })
    const finished = defineModel<boolean>('finished', {
        required: true,
        type: Boolean,
    })

    let partialSortedPiles = defineModel<
        Array<SortedArray<DataId> | Atom<DataId> | NlognElement<DataId>>
    >('partialSortedPiles', {
        required: true,
        type: Array<SortedArray<DataId> | Atom<DataId> | NlognElement<DataId>>,
    })

    function parseInPiles(piles) {
        //  checks if the piles are an array of idData, a recursive array, or a renderableSortArray.
        // if Array<idData>, convert to recursiveSortArray<idData> ==> recursiveDistribute
        // moves the result to partialSortedPiles
        //
    }
    onMounted(() => {
        parseInPiles(props.inPiles)
    })

    const readyToMixSort = computed(() => {
        if (allPilesAtomsOrSorted) {
            return true
        }
        if (fewEnoughPiles) {
            return true
        }
        return false
    })

    function getCurrnetPiles(): renderableSortPile<DataId> {
        // if there are still some unsorted piles in the array, returns the first of those
        //  if all piles are SortedArray|Atom, checks the number of piles against the compareLength and returns the first compareLength many piles
    }

    const currentPiles = computed(() => getCurrnetPiles())
    const fewEnoughPiles = computed(() => {
        return currentPiles.value.length <= compareLength.value
    })

    const allPilesAtomsOrSorted = computed(() => {
        return currentPiles.every((pile) => {
            return isAtom(pile.data) || isSorted(pile.data)
        })
    })

    const compareLength = computed(() => {
        return props.grid.x * props.grid.y
    })

    if (readyToMixSort) {
    }

    function needRecursion() {
        if (allPilesAtomsOrSorted) {
            return false
        }
        if (fewEnoughPiles) {
            return false
        }
    }

    // 1. check if all piles are sorted.
    // 1b. if not, MixCompare on getFirstUnsorted(inPiles).
    // 2. check length of InPiles <= compareLength.
    // 2b. if not, split the piles.
    // 2c. prioratise merging smallest piles first. --> sortArray((ar)=>ar.data.length|atom=1)
    // 2d. Then MixCompare the subArray.
    // 3. MixCompare.

    function splitPiles() {
        // calls the recursion on the split piles
    }
</script>

<style></style>
