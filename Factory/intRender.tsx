import type { CSSProperties } from 'vue'
import type { JSX } from 'vue/jsx-runtime'
import type { IntRender } from '~/types/component/stores'

/**
 *
 * @returns a **placeholder** for integer rendering
 */
export function intRender_Factory(): IntRender {
    function renderInt(data: number): JSX.Element {
        // TODO: move the tailwind code here.`
        return <div>{data}</div>
    }
    return renderInt
}
