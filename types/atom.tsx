import type { JSX } from 'vue/jsx-runtime'

export interface Atom<Data> {
    data: Data
    render: () => JSX.Element
}
