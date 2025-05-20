<script setup lang="tsx">
    import { range } from '~/utils/manipulation/range'

    import type { JSX } from 'vue/jsx-runtime'
    import {
        getRenderFunction,
        renderFactoryByDataType,
        type DataRenderFunction,
        type DataStore,
        type idData,
    } from '~/Factory/DataRender'
    import randomiseArray from '~/utils/array/randomise'
    import type { SortAtom, SortedArray } from '~/types/sorting'
    import { FactoryPkmnNumCard } from '~/Factory/pkmnNumCard'
    import { testMixPiles } from '~/constants/pkmnTestData'
    import { intStoreFactory } from '~/Factory/intStore'
    import { pkmnStore } from '~/Factory/pkmnStore'

    const genCap = 9
    const pileCap = 9

    function choosePile(pile: any[], refPile: any): void {
        pile.reverse()
        const h = pile.pop()
        pile.reverse()
        refPile.push(h)
        // console.log(pile)
    }
    const ar = range(genCap)

    /*
    Idea: create a generator function that takes in a NestedArray<T>, and at each "comparison step" it exposes "something" to wait for user input to be used as the comparison step.

    The function should run recursivly (obviously), and companre the elements to T:
      - if the elements are a collection of Array<T>, then each of those elements can be thought of as a sorted list.
      - otherwise the contents is a NestedArray<Array<T>>, ==> recusion.

    When we have "dug down" to the second from bottom elements of the NestedArray<T> we should get an array of Array<T>
    We then merge the elements of these arrays, starting with the first elements of each Array<T> being exposed to the user for comparison, and the "winner" being added to the return object as the first element.
    Iterating until all element Array<T> are empty, then returning the sorted list (type Array<T>).
      - Note this will remove one layer of NestedArray<Array<T>> returning a NestedArray<T>.
      - if the recursive function is given a NestedArray<T> as input, it will return it unchanged (assuming it is an already sorted list.)
    */

    const testNums = range(4) //0-indexed array of DATA from 1 to 12
    const testArray: Array<number> = randomiseArray(testNums)
    const numAtomArray = declareArrayAtomic(testArray).data

    // const rf: DataRenderFunction = getRenderFunction('pkmnNumCard')
    // function dataRenderFunction(idData: number): JSX.Element {
    //     return rf(idData)
    // }

    // const testPilesInxS = range(4)
    // const testPiles = recursiveTagAndDistribute(testPilesInxS, 2)

    const intStore = intStoreFactory(numAtomArray)

    const rf = renderFactoryByDataType('int', intStore)

    const pf = FactoryPkmnNumCard(pkmnStore)

    const testRF = (idx: idData): JSX.Element => {
        return <div>TEST rf</div>
    }
    const grid = {
        xCount: 3,
        yCount: 3,
    }
    const f_resMIX = ref(false)
    const out_resMIX = ref([] as Array<SortAtom<idData>>)

    const mixPiles = testMixPiles.slice(0, pileCap)
</script>

<template>
    <!-- {{ inPile }} -->
    <!-- <NlognAtomCompare
        :inPile
        :outPile
        :emptyAtom
        :shouldIndexRender
        :gridSize="{ xCount: 4, yCount: 4 }"
        :dataRenderFunction="A"
    /> -->

    <!-- MIX -->
    <UContainer
        class="flex border-green-500 border-2 align-center justify-center h-96 bg-black"
        style="padding: 0%"
        width="500"
    >
        <NlognMixCompare
            :inPiles="mixPiles"
            :gridSize="grid"
            :dataRenderFunction="pf"
            :defaultRenderFunction="() => pf(251)"
            :dataStore="intStore"
            v-model:finished="f_resMIX"
            v-model:outPile="out_resMIX"
            :renderResultsPile="true"
        />
    </UContainer>

    <!-- TODO: creta a type file to hold dataRenderFunction. Then use this as a concrete type to be extended here? -->
</template>

<style scoped></style>
