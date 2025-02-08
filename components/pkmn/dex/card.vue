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
                <div style="padDiv" />
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
            required: true,
        },
    })
    const borderWidth = 7
    const textHeight = 30
    const imgHeight = props.w
    const padSize = props.h - textHeight - 2 * borderWidth
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

    .bottomAligned {
        flex-basis: v-bind(textHeight + 'px');
        padding-left: 5px;
    }
    .pkmnImg {
        flex-basis: v-bind(padSize + 'px');
    }
    .padDiv {
        flex-grow: 100;
        flex-basis: v-bing(padSize + 'px');
    }
</style>
