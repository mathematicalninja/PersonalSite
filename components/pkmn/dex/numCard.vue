<template>
    <PkmnDexCard
        :h="props.h"
        :w="props.w"
        :onClick="props.onClick"
        :pokeNumber="pokeNumber"
    />
</template>

<script lang="ts" setup>
    import { PkmnDexCard } from '#components';
    import type { pokeCardInfo } from '~/types/pkmn';
    import { getPkmnImageJson } from '~/composables/pkmn/getImageJson';

    const props = defineProps({

    h: {
        type: Number,
        required: false,
        default: 190,
    },
    w: {
        type: Number,
        required: false,
        default: 140,
    },
    onClick: {
        type: Function,
        required: true,
    },
    dexNum: {
        type: Number,
        required: true,
    },
    })

    const pokeNumber = computed(() => getPkmnImageJson(props.dexNum, 1));

</script>

<style>

</style>