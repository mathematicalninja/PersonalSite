<!-- Purpose: To render the FIRST element of a sort pile, with interactability, for other components to consume -->
<!-- TODO: Make sure this is NOT an implementation of pileCompare -->
<!-- TODO: add in a "pre-load" to prepare the second element of each pile -->
<!-- TODO: add in the "undo" functionallity, by having a "returnElement" function when a "returnAtom" is passed in as a prop, it's then pile.reverse().push(returnAtom).reverse()-->

<template>
    <div> </div>
</template>

<script lang="ts" setup>
    import type { Atom } from '~/types/atom'
    import type {
        nonRecursiveSortArray,
        SortArray,
        SortAtom,
    } from '~/types/sorting'

    // TODO: convert Atom ==> ClickableAtom, passing click function here
    type RenderableSortArrayOrAtom =
        | SortAtom<Atom<any>>
        | SortArray<SortAtom<Atom<any>>>
    const props = defineProps({
        inPile: {
            type: Object as PropType<nonRecursiveSortArray<any>>,
            required: true,
        },

        outPile: {
            type: Array<SortAtom<Atom<any>>>,
            required: true,
        },
        emptyAtom: {
            type: Object as PropType<SortAtom<Atom<any>>>,
            required: true,
        },
        // TODO:remove from props, as this should be a locally handled state
        shouldIndexRender: {
            type: Array<boolean>,
            required: true,
        },
        atomRender: {
            // css class name
            type: String,
            required: false,
            default: '',
        },
    })

    const inArray = ref(props.inPile)
    const outArray = ref(props.outPile)
    // TODO: switch to props.shouldIndexRender
    const empty = ref(new Array(inArray.value.length).fill(false))
    function devalue(index: number) {
        empty.value[index] = true
        outArray.value.push(inArray.value[index])
    }
    function allDevalued() {
        // return false
        return empty.value.every((val) => val == true)
    }
</script>

<style></style>
