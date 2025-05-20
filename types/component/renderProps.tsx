import type { RenderById } from '../layout/rendering'

export type RenderDataByIdProps<DataId> = {
    dataRenderFunction: RenderById<DataId>
    DataId: DataId
}
