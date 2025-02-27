import { defineComponent, type PropType } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

export default defineComponent({
    name: 'Atom',
    props: {
        data: {
            type: Object as PropType<Record<string, any>>,
            required: true,
        },
        render: {
            type: Function as PropType<
                (data: Record<string, any>) => JSX.Element
            >,
            required: true,
        },
    },
    setup(props) {
        return () => props.render(props.data)
    },
})
