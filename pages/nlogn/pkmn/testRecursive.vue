<script lang="ts" setup>
    import type { NationalNum } from '~/types/component/pkmn'
    import type { NlognElement } from '~/types/nlogn/dataStruct'
    import { singleSplit } from '~/utils/array/distributeEvenlyForSorting'
    import { distributeEvenlyForSorting_Stack } from '~/utils/array/distributeEvenlyForSorting_Stack'

    import { rangeFrom } from '~/utils/array/rangeFrom'

    // import Recursion from '~/components/nlogn/FullRecursion.vue'
    const gens = [
        [0],
        rangeFrom(1, 151),
        rangeFrom(152, 251),
        rangeFrom(252, 386),
        rangeFrom(387, 493),
        rangeFrom(494, 649),
        rangeFrom(650, 721),
        rangeFrom(722, 809),
        rangeFrom(810, 905),
        rangeFrom(906, 1025),
    ]

    const currentGen = ref(0)

    const currentPile = computed<NlognElement<NationalNum>>(() => {
        if (currentGen.value == 0) {
            return {} as NlognElement<NationalNum>
        }
        return distributeEvenlyForSorting_Stack<NationalNum>(
            gens[currentGen.value],
            compareCount.value,
        )
    })
    const compareCount = ref(4)

    function updatePile(genNum: number) {
        if (gens[genNum]) {
            currentGen.value = genNum
        } else {
            console.error(`Generation ${genNum} does not exist.`)
        }
    }
    const blurb = ref({})
    function test(genNum: number) {
        blurb.value = singleSplit(gens[genNum], compareCount.value)
    }
</script>

<template>
    <!-- <QNumberField
        :min="1"
        :modelValue="compareCount"
    /> -->
    <div>
        {{ blurb }}
        <QButton
            :onClick="
                () => {
                    // console.log('Updating to Gen 1')
                    test(1)
                }
            "
            >Gen 1</QButton
        >
    </div>
    <div>{{ currentPile }}</div>
</template>

<style></style>
