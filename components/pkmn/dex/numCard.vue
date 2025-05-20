<template>
    <PkmnDexCard
        :imageBoundry="props.imageBoundry"
        :onClick="props.onClick"
        :pokeCardInfo="pokeCardInfo"
        :cardBoundry="props.cardBoundry"
    />
</template>

<script lang="ts" setup>
    import { computed } from 'vue'
    import { getPokeCardInfo_Lazy } from '~/composables/pkmn/getImageJson'
    import type { PkmnNationalNumCard_Props } from '~/types/component/pkmnProps'

    // {
    // h: {
    //     type: Number,
    //     required: false,
    //     default: 190,
    // },
    // w: {
    //     type: Number,
    //     required: false,
    //     default: 140,
    // },
    // onClick: {
    //     type: Function,
    //     required: false,
    //     default: () => {
    //         return
    //     },
    // },
    // dexNum: {
    //     type: Number,
    //     required: true,
    // },
    // }

    const props = withDefaults(defineProps<PkmnNationalNumCard_Props>(), {
        imageBoundry: () => {
            return { height: 140, width: 140 }
        },

        cardBoundry: () => {
            return { height: 190, width: 140 }
        },
        onClick: () => {},
    })

    // TODO: pokeNumber here uses Lazy data --> update
    const pokeCardInfo = computed(() =>
        getPokeCardInfo_Lazy(props.nationalNum, 1),
    )
    // TODO: #92 Refactor pkmnDexNumCard to retyrn "blank" pokeball card if no dexNum is provided
    // TODO: #93 Allow pkmnDexNumCard (and upstream) to accept no function
</script>

<style></style>
