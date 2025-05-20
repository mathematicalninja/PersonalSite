import type { JSX } from 'vue/jsx-runtime'
import type { DataId } from '~/types/generics/DataId'
import type { RenderWithIndex } from '~/types/layout/rendering'

// export type RenderWithIndex = (idData: idData, idx: number) => JSX.Element

export default defineComponent({
    name: 'RenderedElement',
    props: {
        dataRenderFunction: {
            type: Function as PropType<RenderWithIndex<DataId>>,
            required: true,
        },
        DataId: {
            type: [String, Number] as PropType<DataId>,
            required: true,
        },
        idx: {
            type: Number,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const data = props.dataRenderFunction(props.DataId, props.idx)
            return <span>{data}</span>
        }
    },
})
