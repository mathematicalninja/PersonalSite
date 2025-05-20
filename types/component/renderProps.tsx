import type { RenderById } from '../layout/rendering'

export type RenderDataByIdProps<DataId> = {
    dataRenderFunction: RenderById<DataId>
    DataId: DataId
}

export type RenderMarkdownProps = {
    markdown: { data: any; content: string }
    alignment?: 'left' | 'right' | 'center' | 'justify'
    link?: string
}
