<template>
    <AlignmentNmGrid
        :n="4"
        :m="4"
        v-if="!allDevalued()"
    >
        <template #gridItem="{ index }">
            <div
                class="intStyle"
                v-if="index < ar.length"
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
                            :atom="emptyIntAtom"
                        />
                        <RenderSortAtom
                            v-if="empty[index] == false"
                            :atom="ar[index]"
                        />
                    </AlignmentCenterDiv>
                </NlognClickCard>
            </div>
        </template>
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

    <RenderSortAtom
        v-if="outPile.length > 0"
        :atom="refPile[outPile.length - 1]"
    />
</template>

<script lang="tsx" setup>
    import type { SortAtom } from '~/types/sorting'
    import randomiseArray from '~/utils/array/randomise'
    import type { Atom } from '~/types/atom'
    import type { JSX } from 'vue/jsx-runtime'
    import { PkmnDexNumCard } from '#components'

    const intCount = 16
    const unsortedInt: Array<number> = randomiseArray(range(intCount))

    /**
     * TODO: need to be able to pass a "renderable" into the recursiveTagAndDistribute function, or use its output to generate renderables.
     *
     *
     *  Need a "dig down" function that gets down to the list of Atomics.
     *  This is what "B" does
     *
     *  Use these atoms to generate renderables.
     *       ==> have a component that the atom can be passed to as a prop.
     *  Use these renderables to generate a grid.
     *  This os what "A" does
     * */

    // TODO: Here we need to make it so
    // A1. Atomic Arrays are checked for
    // A2. Atomic Arrays can be rendered
    // A3. Atomic Arrays can be sorted in place

    // B1. Sorted Arrays (as elements) can be checked for.
    // B2. Sorted arrays can have their top element (which should be atomic) used as its representative element.
    // B3. these elements can be rendered
    // B4. these elements can be used in the sorting algorithm to create a unified pile.

    // C1. Sorted Piles can be checked for, and passed

    // TODO: #111 add tailwind support to .tsx code embedded in .vue files
    function intAtom(num: number): Atom<number> {
        function r(num: number): JSX.Element {
            return <div class="hover:scale-125">{num}</div>
        }
        return {
            data: num,
            render: () => r(num),
        }
    }

    const emptyIntAtom: SortAtom<Atom<number>> = {
        state: 'atom',
        data: { data: 0, render: () => <div></div> },
    }
    function intAtomArray(ar: number[]): Array<SortAtom<Atom<number>>> {
        return ar.map((num) => tagAtomic(intAtom(num)))
    }
    const ar = ref(intAtomArray(unsortedInt))

    // TODO: #110 move RenderSortAtom to seperate file
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

    // control sequence for "hiding" the clicked atom and adding to the pile.
    // Input = ar: ref(Array<SortAtom<Atom<any>>>)
    const refPile: Array<SortAtom<Atom<any>>> = []
    const outPile = ref(refPile)
    const empty = ref(new Array(ar.value.length).fill(false))
    function devalue(index: number) {
        empty.value[index] = true
        outPile.value.push(ar.value[index])
    }
    function allDevalued() {
        // return false
        return empty.value.every((val) => val == true)
    }
    const showGrid = ref(allDevalued())
    const intStyle = 'border-2 border-white text-5xl w-16 h-16'

    // Conversions for pkmn version
    function pkmnAtom(num: number): Atom<number> {
        function r(num: number): JSX.Element {
            return <PkmnDexNumCard dexNum={num} />
        }
        return {
            data: num,
            render: () => r(num),
        }
    }
    function pkmnAtomArray(ar: number[]): Array<SortAtom<Atom<number>>> {
        return ar.map((num) => tagAtomic(pkmnAtom(num)))
    }
    // const ar = ref(pkmnAtomArray(unsortedInt))

    // TODO: create a "atoms to renderables" function. Goal: take in ar:Array<Atom<T>> and return <Array<SortAtom<Atom<T>>>>
    function atomsToRenderables<T>(
        ar: Array<Atom<T>>,
    ): Array<SortAtom<Atom<T>>> {
        return ar.map((atom) => tagAtomic(atom))
    }

    // TODO: Better idea:
    // Make a function that takes an array of data:T, a render function and returns the array A:<Array<SortAtom<Atom<T>>>>. mapping against index, not just using index as the data.
</script>

<script lang="tsx"></script>

<style>
    .intStyle {
        border: 2px solid white;
        font-size: 3rem;
        line-height: 1;
        width: 4rem;
        height: 4rem;
    }
</style>
