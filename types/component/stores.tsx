import type { JSX } from 'vue/jsx-runtime'

export type IntStore = (DataID: number) => number
export type IntRender = (data: number) => JSX.Element

export type PkmnStore_National = (nationalDexNum: number) => number
export type PkmnRender_National = (nationalDexNum: number) => JSX.Element
