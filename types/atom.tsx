import type { JSX } from 'vue/jsx-runtime'

// export interface AtomProps<AtomData> {
//     data: AtomData
//     render: (data: AtomData) => JSX.Element
// }

// export interface AtomData extends Record<string, any> {}

export interface Atom<Data> {
    data: Data
    render: () => JSX.Element
}
