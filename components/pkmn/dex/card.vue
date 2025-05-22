<template>
    <div class="pokeCard group">
        <ClickCard
            :onClick="() => props.onClick()"
            :width="props.cardBoundry.width"
            :height="props.cardBoundry.height"
        >
            <div class="divCenterer">
                <div class="pkmnImg">
                    <!-- Card.vue: {{ props.imageBoundry }} -->
                    <PkmnDexImg
                        :pokeDexNum="props.pokeCardInfo.num"
                        :parentShape="props.imageBoundry"
                    />
                </div>
                <div class="padDiv" />
                <p
                    class="bottomAligned"
                    v-if="props.pokeCardInfo.num.numInDex !== 0"
                    >#{{ props.pokeCardInfo.num.numInDex }}
                    {{ props.pokeCardInfo.name }}</p
                >
            </div>
        </ClickCard>
    </div>
</template>

<script lang="ts" setup>
    import type { PkmnDexCard_Props } from '~/types/component/pkmnProps'

    //     {
    //     h: {
    //         type: Number,
    //         required: false,
    //         default: 190,
    //     },
    //     w: {
    //         type: Number,
    //         required: false,
    //         default: 140,
    //     },
    //     onClick: {
    //         type: Function,
    //         required: true,
    //     },
    //     pokeNumber: {
    //         type: Object as () => PkmnCardInfo,
    //         //TODO: #77 change `pokeCardInfo` and all downstream references to simply use the dexNum/genNum
    //         // TODO: #78 add in a "full Art" version of pkmnDexCard that only relies on the dex num
    //         // TODO: #79 lookup API for pokemon by name/uuid etc. to allow for varients in cards (e.g. shinies)
    //         required: true,
    //     },
    //     // TODO: #74 add in method or alternative component  => dexNum only generates card rather than pokeCardInfo
    // }

    const props = withDefaults(defineProps<PkmnDexCard_Props>(), {
        imageBoundry: () => {
            return {
                height: 140,
                width: 140,
            }
        },
        cardBoundry: () => {
            return {
                height: 190,
                width: 140,
            }
        },
        onClick: () => {},
    })

    const borderWidth = 7
    const textHeight = 30
    const imgHeight = props.imageBoundry.height
    const padSize =
        props.imageBoundry.height + textHeight + 2 * borderWidth - imgHeight
    const cardWidth = props.cardBoundry.width
    const cardHeight = props.cardBoundry.height + padSize - 2 * borderWidth
    // TODO: #120 better veritcal image centering in PkmnDexCard
</script>

<style>
    .pokeCard {
        border: v-bind(borderWidth + 'px') solid yellow;
        border-radius: 10px;
        width: v-bind(cardWidth + 'px');
        height: v-bind(cardHeight + 'px');
        display: flex;
        flex-direction: column;
    }

    .divCenterer {
        display: flex;
        flex-direction: column;
    }

    .pkmnImg {
        flex-basis: v-bind(imgHeight + 'px');
    }
    .padDiv {
        /* flex-grow: 1; */
        flex-basis: v-bind(padSize + 'px');
    }
    .bottomAligned {
        flex-basis: v-bind(textHeight + 'px');
        padding-left: 5px;
    }
</style>
