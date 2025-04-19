<template>
    <div class="pokeCard">
        <ClickCard
            :onClick="() => props.onClick()"
            :w="props.w"
            :h="props.h"
        >
            <div class="divCenterer">
                <div class="pkmnImg">
                    <PkmnDexImg
                        :dex-num="props.pokeNumber.num.dexNum"
                        :gen-num="props.pokeNumber.num.genNum"
                        :parent_height="props.w"
                        :parent_width="props.w"
                    />
                </div>
                <div class="padDiv" />
                <p class="bottomAligned"
                    >#{{ props.pokeNumber.num.dexNum }}
                    {{ props.pokeNumber.name }}</p
                >
            </div>
        </ClickCard>
    </div>
</template>

<script lang="ts" setup>
    import type { _borderColor } from '#tailwind-config/theme'
    import type { pokeCardInfo } from '~/types/pkmn'

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
        pokeNumber: {
            type: Object as () => pokeCardInfo,
            //TODO: #77 change `pokeCardInfo` and all downstream references to simply use the dexNum/genNum
            // TODO: #78 add in a "full Art" version of pkmnDexCard that only relies on the dex num
            // TODO: #79 lookup API for pokemon by name/uuid etc. to allow for varients in cards (e.g. shinies)
            required: true,
        },
        // TODO: #74 add in method or alternative component  => dexNum only generates card rather than pokeCardInfo
    })
    const borderWidth = 7
    const textHeight = 30
    const imgHeight = props.w
    const padSize = props.h - textHeight - 2 * borderWidth - imgHeight
</script>

<style>
    .pokeCard {
        border: v-bind(borderWidth + 'px') solid yellow;
        border-radius: 10px;
        width: v-bind(w + 'px');
        height: v-bind(h + 'px');
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
