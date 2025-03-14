<!--
Goal: have this component accept a list of atoms and allow the user to interface with sorting them.

1. Fail-safe against not atoms.
1a. Store data.
2. Render a div-list ==> styling should be left to the parent. (e.g. NMGrid) so Slot template
2a. Each div should be clickable.
2b. Hover option?
3. On Click => migrate atom to return pile.
3a. May need a composable to hangle data passing between the components.
4. Avoid div-jiggling.
-->
<script lang="tsx" setup>
    import type { Atom } from '~/types/atom'
    import type { SortAtom } from '~/types/sorting'

    // TODO: convert Atom ==> ClickableAtom, passing click function here
    const props = defineProps({
        inPile: {
            type: Array<SortAtom<Atom<any>>>,
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
        shouldIndexRender: {
            type: Array<boolean>,
            required: true,
        },
        // n: {
        //     type: Number,
        //     required: true,
        // },
        // m: {
        //     type: Number,
        //     required: true,
        // },
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

    const RenderSortAtom = defineComponent({
        props: {
            atom: {
                type: Object as PropType<SortAtom<Atom<any>>>,
                required: true,
            },
        },
        setup(props) {
            return () => {
                return props.atom.data.render()
            }
        },
    })
</script>

<template>
    <!-- Sort Grid -->
    <AlignmentNmGrid
        :n="4"
        :m="4"
        v-if="!allDevalued()"
    >
        <template #grid-item="{ index }">
            <div
                class="intStyle"
                v-if="index < inArray.length"
                :key="index"
            >
                <NlognClickCard
                    :onClick="
                        () => {
                            devalue(index)
                        }
                    "
                >
                    <AlignmentCenterDiv>
                        <RenderSortAtom
                            v-if="empty[index] == true"
                            :atom="props.emptyAtom"
                        />
                        <RenderSortAtom
                            v-if="empty[index] == false"
                            :atom="inArray[index]"
                        />
                    </AlignmentCenterDiv>
                </NlognClickCard>
            </div>
        </template>
        <!-- Return Display -->
    </AlignmentNmGrid>
    <div v-if="allDevalued()">
        <div
            v-for="(atom, idx) in outPile"
            class="intStyle"
        >
            <AlignmentCenterDiv>
                <RenderSortAtom
                    :key="idx"
                    :atom="atom"
                />
            </AlignmentCenterDiv>
        </div>
    </div>

    <!-- "undo" pile
     TODO: implement logic
      -->
    <RenderSortAtom
        v-if="outArray.length > 0"
        :atom="inPile[outArray.length - 1]"
    />
</template>

<style></style>
