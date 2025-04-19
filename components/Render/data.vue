<template>
    <div>
        <RE
            :dataRenderFunction="props.dataRenderFunction"
            :idData="props.idData"
        />
    </div>
    <!-- <div>
        {{ props.dataRenderFunction(props.data) }}
    </div> -->
</template>

<script lang="tsx" setup generic="T">
    import type {
        DataRenderFunction,
        idData,
        RenderById,
    } from '~/Factory/DataRender'
    const props = defineProps<{
        dataRenderFunction: RenderById
        idData: idData
    }>()

    // // ~~~ Psuedo code for renderFunction ~~~
    // function renderFunction<T>(data: T) {
    //     // render data
    //     return <div>{{ data }}</div>
    // }
    // const renderedElement = computed(() => props.dataRenderFunction(props.data))
    // TODO: turn renderedElement into a locally defined component
    const RE = defineComponent({
        // const RenderedElement = defineComponent({
        name: 'RenderedElement',
        props: {
            dataRenderFunction: {
                type: Function as PropType<DataRenderFunction>,
                required: true,
            },
            idData: {
                type: [String, Number] as PropType<idData>,
                required: true,
            },
        },
        setup(props) {
            return () => {
                // return props.dataRenderFunction(props.idData)
                return <div>Help</div>
            }
        },
    })
</script>

<style></style>
