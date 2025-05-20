import type { RenderDataByIdProps } from '~/types/component/renderProps'

// const props = defineProps<RenderDataByIdProps<DataId>>()

// export default defineComponent({
//     name: 'RenderedElement',
//     props: props
//     // {
//     //     dataRenderFunction: {
//     //         type: Function as PropType<RenderById>,
//     //         required: true,
//     //     },
//     //     idData: {
//     //         type: [String, Number] as PropType<idData>,
//     //         required: true,
//     //     },
//     // },

//     setup(props) {
//         return () => {
//             const data = props.dataRenderFunction(props.idData)
//             return <span>{data}</span>
//         }
//     },
// })

import { defineComponent } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

export function createRenderByIdComponent<DataId>() {
    return defineComponent({
        name: 'RenderedElement',
        props: {
            dataRenderFunction: {
                type: Function as PropType<(id: DataId) => JSX.Element>,
                required: true,
            },
            DataId: {
                type: null as unknown as PropType<DataId>,
                required: true,
            },
        },
        setup(props) {
            return () => {
                const data = props.dataRenderFunction(props.DataId as DataId)
                return <span>{data}</span>
            }
        },
    })
}
