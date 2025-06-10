<script lang="ts" setup>
    import { cn } from '~/components/ui/lib'
    import { getLog10Accuracy } from '~/utils/calculate/getLog10Accuracy'
    import { pricePer } from '~/utils/calculate/pricePer'

    const inputCss = cn([
        'border',
        'p-2',
        'w-64',
        'mb-2',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
    ])

    const inputCard = cn(['flex', 'flex-col', 'gap-4', 'p-4'])
    const cheapCard = cn([
        inputCard,
        'bg-success',
        'text-success-foreground',
        'border-4',
        'border-accent',
    ])
    const expemsiveCard = cn([inputCard, 'bg-fail', 'text-fail-foreground'])
    const equalCard = cheapCard
    // cn([inputCard, 'bg-success', 'text-success-foreground'])

    // const cheapest = ref('none' as 'none' | 'left' | 'right' | 'equal')
    const cheapest = computed<'none' | 'left' | 'right' | 'equal'>(() => {
        if (leftAmount.value == 0 || rightAmount.value == 0) {
            return 'none'
        }
        if (leftUnitCost.value < rightUnitCost.value) {
            return 'left'
        } else if (rightUnitCost.value < leftUnitCost.value) {
            return 'right'
        } else {
            return 'equal'
        }
    })
    const leftClass = computed(() => {
        switch (cheapest.value) {
            case 'none':
                return inputCard
            case 'left':
                return cheapCard
            case 'right':
                return expemsiveCard
            case 'equal':
                return equalCard
        }
    })

    const rightClass = computed(() => {
        switch (cheapest.value) {
            case 'none':
                return inputCard
            case 'left':
                return expemsiveCard
            case 'right':
                return cheapCard
            case 'equal':
                return equalCard
        }
    })

    const leftName = ref('')
    const rightName = ref('')

    const leftCost = ref(0)
    const rightCost = ref(0)

    const leftAmount = ref(0)
    const rightAmount = ref(0)

    const leftPer10 = computed(() => {
        const thisTens = getLog10Accuracy(leftAmount.value)
        const otherTens = getLog10Accuracy(rightAmount.value)
        const tens = 10 ** Math.max(thisTens, otherTens)
        return {
            price: pricePer({
                goalAmount: tens,
                price: leftCost.value,
                quantity: leftAmount.value,
            }),
            per: tens,
        }
    })
    const rightPer10 = computed(() => {
        const thisTens = getLog10Accuracy(rightAmount.value)
        const otherTens = getLog10Accuracy(leftAmount.value)
        const tens = 10 ** Math.max(thisTens, otherTens)

        return {
            price: pricePer({
                goalAmount: tens,
                price: rightCost.value,
                quantity: rightAmount.value,
            }),
            per: tens,
        }
    })

    const leftUnitCost = computed(() => {
        if (leftAmount.value === 0) return 0
        return leftCost.value / leftAmount.value
    })

    const rightUnitCost = computed(() => {
        if (rightAmount.value === 0) return 0
        return rightCost.value / rightAmount.value
    })

    const headingCss = cn([
        'text-4xl',
        'font-bold',
        'm-4',
        'text-center',
        'text-primary-foreground',
    ])

    const cheapestText = cn([
        'text-2xl',
        'font-bold',
        'text-success-foreground',
        'bg-success',
        'p-2',
        'rounded-md',
    ])

    const percentCheaper = computed<string>(() => {
        if (cheapest.value === 'equal') return ''
        const cheap =
            cheapest.value === 'left' ? leftUnitCost.value : rightUnitCost.value
        const expensive =
            cheapest.value === 'left' ? rightUnitCost.value : leftUnitCost.value
        return `${(((expensive - cheap) / expensive) * 100).toFixed(
            0,
        )}% cheaper!`
    })

    const percentExpensive = computed<string>(() => {
        if (cheapest.value === 'equal') return ''
        const cheap =
            cheapest.value === 'left' ? leftUnitCost.value : rightUnitCost.value
        const expensive =
            cheapest.value === 'left' ? rightUnitCost.value : leftUnitCost.value
        return `${(((expensive - cheap) / cheap) * 100).toFixed(
            0,
        )}% more expensive!`
    })

    function reset() {
        leftName.value = ''
        rightName.value = ''
        leftCost.value = 0
        rightCost.value = 0
        leftAmount.value = 0
        rightAmount.value = 0
    }
</script>

<template>
    <AlignmentCenterDiv>
        <h1 :class="headingCss">Price Comparison Tool</h1>
    </AlignmentCenterDiv>
    <AlignmentCenterDiv>
        <div>
            <div :class="cn(['flex', 'gap-4', 'p-4'])">
                <QCard :class="leftClass">
                    <input
                        type="text"
                        placeholder="name"
                        :class="inputCss"
                        v-model="leftName"
                    />
                    Cost: ${{ leftCost }}
                    <input
                        type="number"
                        :placeholder="leftCost.toString()"
                        :class="inputCss"
                        v-model="leftCost"
                    />
                    <span v-if="leftName !== ''">
                        Amount of {{ leftName }}: {{ leftAmount }}</span
                    >
                    <span v-else> Amount: {{ leftAmount }}</span>

                    <input
                        type="number"
                        :placeholder="leftAmount.toString()"
                        :class="inputCss"
                        v-model="leftAmount"
                    />
                    <AlignmentCenterDiv>
                        <span
                            v-if="cheapest == 'left'"
                            :class="cheapestText"
                            >{{ percentCheaper }}</span
                        >
                        <span
                            v-else-if="cheapest == 'right'"
                            :class="expemsiveCard"
                            >{{ percentExpensive }}</span
                        >
                        <span
                            v-else-if="cheapest == 'equal'"
                            :class="cheapestText"
                            >Equal Price!</span
                        >
                    </AlignmentCenterDiv>
                    <AlignmentCenterDiv v-if="rightPer10.price !== -1">
                        ${{ leftPer10.price.toFixed(2) }} per
                        {{ leftPer10.per }}
                    </AlignmentCenterDiv>
                </QCard>
                <QCard :class="rightClass">
                    <input
                        type="text"
                        placeholder="name"
                        :class="inputCss"
                        v-model="rightName"
                    />
                    Cost: ${{ rightCost }}
                    <input
                        type="number"
                        :placeholder="rightCost.toString()"
                        :class="inputCss"
                        v-model="rightCost"
                    />
                    <span v-if="rightName !== ''">
                        Amount of {{ rightName }}: {{ rightAmount }}</span
                    >
                    <span v-else> Amount: {{ rightAmount }}</span>

                    <input
                        type="number"
                        :placeholder="rightCost.toString()"
                        :class="inputCss"
                        v-model="rightAmount"
                    />
                    <AlignmentCenterDiv>
                        <span
                            v-if="cheapest == 'right'"
                            :class="cheapestText"
                            >{{ percentCheaper }}</span
                        >
                        <span
                            v-else-if="cheapest == 'left'"
                            :class="expemsiveCard"
                            >{{ percentExpensive }}</span
                        >
                        <span
                            v-else-if="cheapest == 'equal'"
                            :class="cheapestText"
                            >Equal Price!</span
                        >
                    </AlignmentCenterDiv>
                    <AlignmentCenterDiv v-if="rightPer10.price !== -1">
                        ${{ rightPer10.price.toFixed(2) }} per
                        {{ rightPer10.per }}
                    </AlignmentCenterDiv>
                </QCard>
            </div>
        </div>
    </AlignmentCenterDiv>
    <AlignmentCenterDiv>
        <QButton :onClick="reset">Resest</QButton>
    </AlignmentCenterDiv>
</template>

<style></style>
