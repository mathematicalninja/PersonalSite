import type { idData, RenderById } from '~/Factory/DataRender'

export default defineComponent({
    name: 'RenderedElement',
    props: {
        defaultRenderFunction: {
            type: Function,
            required: true,
        },
    },

    setup(props) {
        return () => {
            const data = props.defaultRenderFunction()
            return <span>{data}</span>
        }
    },
})
