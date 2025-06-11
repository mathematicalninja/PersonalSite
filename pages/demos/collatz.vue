<script lang="ts" setup>
    import { useCollatzStore } from '~/stores/collatzStore'

    const collatzStore = useCollatzStore()
    const restartNumber = ref(1)
    const restart = () => {
        collatzStore.restart(restartNumber.value)
    }
</script>

<template>
    <QCard>
        <div
            >New start value:
            <input
                v-model="restartNumber"
                type="number"
        /></div>
        <QButton :onClick="restart">Restart</QButton>
    </QCard>

    <QCard
        >The current value is {{ collatzStore.current }} with
        {{ collatzStore.steps }} steps taken frin {{ collatzStore.start }}.

        <QButton
            :onClick="
                () => {
                    return collatzStore.advance(true)
                }
            "
            >Next</QButton
        >
    </QCard>
    <QCard v-if="collatzStore.isFinished">
        <div
            >The path from {{ collatzStore.start }} took
            {{ collatzStore.timeToOne }} steps to finish.</div
        ><div>{{ collatzStore.path }}</div>
    </QCard>
</template>

<style></style>
