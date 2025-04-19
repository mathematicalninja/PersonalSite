import type { JSX } from 'vue/jsx-runtime'
import type { idData, RenderById } from '~/Factory/DataRender'

export type RenderWithIndex = (idData: idData, idx: number) => JSX.Element

export default defineComponent({
    name: 'RenderedElement',
    props: {
        dataRenderFunction: {
            type: Function as PropType<RenderWithIndex>,
            required: true,
        },
        idData: {
            type: [String, Number] as PropType<idData>,
            required: true,
        },
        idx: {
            type: Number,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const data = props.dataRenderFunction(props.idData, props.idx)
            return <span>{data}</span>
        }
    },
})
