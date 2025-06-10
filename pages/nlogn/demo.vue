<template>
    <AlignmentXyGrid
        :x="x"
        :y="y"
        v-if="!allDevalued()"
    >
        <template #gridItem="{ index }">
            <div
                :class="intOuter"
                v-if="index < ar.data.length"
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
                        <RenderDataByNumber
                            :class="unclicked"
                            v-if="empty[index] == false"
                            :DataId="ar.data[index].data"
                            :dataRenderFunction="intRender"
                        />
                        <RenderDataByNumber
                            :class="emptyInt"
                            v-if="empty[index] == true"
                            :DataId="0"
                            :dataRenderFunction="nullRender"
                        />
                    </AlignmentCenterDiv>
                </NlognClickCard>
            </div>
        </template>
    </AlignmentXyGrid>
    <div
        v-if="allDevalued()"
        :class="resultsOuter"
    >
        <div
            v-for="(atom, idx) in outPile"
            :class="intOuter"
        >
            <AlignmentCenterDiv>
                <RenderDataByNumber
                    :key="idx"
                    :atom="atom"
                    :class="clicked"
                    :DataId="atom.data"
                    :dataRenderFunction="intRender"
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
    import randomiseArray from '~/utils/array/randomise'

    import { range } from '~/utils/array/range'
    import type { JSX } from 'vue/jsx-runtime'
    import { tagArrayAtomic, type Atom } from '~/types/nlogn/dataStruct'
    import { intRender_Factory } from '~/Factory/intRender'
    import type { CSSProperties } from 'vue'
    import { cn } from '~/components/ui/lib'

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

    // control sequence for "hiding" the clicked atom and adding to the pile.
    // Input = ar: ref(Array<SortAtom<Atom<any>>>)
    const intCount = 16
    const x = 4
    const y = 4
    const unsortedInt: Array<number> = randomiseArray(range(intCount))
    const ar = ref(tagArrayAtomic(randomiseArray(unsortedInt)))
    const refPile: Array<Atom<number>> = []
    const outPile = ref(refPile)

    const empty = ref(
        new Array(ar.value.data.length).fill(false) as Array<boolean>,
    )
    function devalue(index: number) {
        empty.value[index] = true
        outPile.value.push(ar.value.data[index])
    }
    function allDevalued() {
        // return false
        return empty.value.every((val) => val == true)
    }
    const showGrid = ref(allDevalued())
    // const intStyle = 'border-2 border-white text-5xl w-16 h-16'

    const nullRender = (data: number): JSX.Element => {
        return <div style={unclicked}></div>
    }

    const intOuter = cn([
        'flex', //
        'items-stretch',
    ])
    const intShape = cn([
        //
        'border-2',
        'text-4xl',
        'w-16',
        'h-16',
        'text-center',
    ])
    const unclicked = cn([
        //
        'bg-primary',
        'text-primary-foreground',
        intShape,
    ])
    const clicked = cn([
        //
        'text-primary-foreground',
        'bg-primary',
        intShape,
    ])

    const emptyInt = cn([
        //
        'text-background-foreground',
        'bg-background',
        intShape,
    ])
    const resultsOuter = cn([
        //
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'align-center',
    ])

    const intRender = intRender_Factory()
</script>

<script lang="tsx"></script>

<style></style>
