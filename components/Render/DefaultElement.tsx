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
            // console.log('data', data)

            // return <div>{data}</div>
            return <span>{data}</span>
            // return <div>{up()}</div>

            // return {props.dataRenderFunction(props.idData)}
            // return <div>make-shift</div>
        }
    },
})
