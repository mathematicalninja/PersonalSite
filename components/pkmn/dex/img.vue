<script setup lang="tsx">
    import { getPkmnImgSize_Lazy } from '~/composables/pkmn/getImageJson'
    import { usePkmnGetFullArtPath_National } from '~/composables/pkmn/getImgPath'
    import type { pkmnImgProps } from '~/types/component/pkmnProps'
    import { gridAlgebra_int } from '~/utils/calculate/alignment/gridAlgebra_int'
    import HeightWidthFromParent from '~/utils/calculate/alignment/HeightWidthFromParent'
    import innerFitToOuter from '~/utils/calculate/alignment/innerFitToOuter'

    const props = withDefaults(defineProps<pkmnImgProps>(), {
        parentShape: () => {
            return { height: 140, width: 140 }
        },
    })

    const imgSize = computed(() =>
        getPkmnImgSize_Lazy(props.pokeDexNum.numInDex),
    )
    // const r = computed(() =>
    //     HeightWidthRatio({
    //         height: imgSize.value.height,
    //         width: imgSize.value.width,
    //     }),
    // )

    // const height = computed(
    //     () =>
    //         HeightWidthFromParent({
    //             ratio: r.value,
    //             parent: props.parentShape,
    //         }).height,
    // )
    // const width = computed(
    //     () =>
    //         HeightWidthFromParent({
    //             ratio: r.value,
    //             parent: props.parentShape,
    //         }).width,
    // )

    // TODO: use this
    const imgShape = computed(() =>
        innerFitToOuter({
            inner: imgSize.value,
            outer: props.parentShape,
        }),
    )

    const width = computed(() => imgShape.value.width)
    const height = computed(() => imgShape.value.height)
</script>

<template>
    <AlignmentCenterDiv>
        <div>
            <QContainer
                style="padding: 0%"
                class="flex"
            >
                <!-- img.vue: w:{{ width }}| h:{{ height }}| -->

                <NuxtImg
                    v-if="props.pokeDexNum.numInDex > 0"
                    class="group-hover:scale-150 hover:scale-150 hover:bg-white/0"
                    :src="
                        usePkmnGetFullArtPath_National(
                            props.pokeDexNum.numInDex,
                        )
                    "
                    :width="width"
                    :height="height"
                />

                <NuxtImg
                    v-if="props.pokeDexNum.numInDex == 0"
                    class=""
                    :src="usePkmnGetFullArtPath_National(0)"
                    :width="width"
                    :height="height"
                />
            </QContainer>
        </div>
    </AlignmentCenterDiv>
</template>

<style scoped></style>
