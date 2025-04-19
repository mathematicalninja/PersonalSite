import type { idData, RenderById } from '~/Factory/DataRender'

export default defineComponent({
    name: 'RenderedElement',
    props: {
        dataRenderFunction: {
            type: Function as PropType<RenderById>,
            required: true,
        },
        idData: {
            type: [String, Number] as PropType<idData>,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const data = props.dataRenderFunction(props.idData)
            return <span>{data}</span>
        }
    },
})
