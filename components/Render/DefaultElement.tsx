import type { JSX } from 'vue/jsx-runtime'

export default defineComponent({
    name: 'RenderedElement',
    props: {
        dataRenderFunction: {
            type: Function as PropType<() => JSX.Element>,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const data = props.dataRenderFunction()
            return <span>{data}</span>
        }
    },
})
