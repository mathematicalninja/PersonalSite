import type { ElementShape } from './grid'
import type { RenderFunction } from './rendering'

export type genericDataById<TypeOfData, DataID> = (idData: DataID) => TypeOfData

// need to be able to get the "default" shape of render objects ot calculate the scale factor and grid fit
type getShape<DataID> = (DataID?: DataID) => ElementShape
// TODO: add in a factory that can do this for any data type.

// Can then pass these into a factory to get a (idData) => JSX.Element function
// or a (idData, idx) => JSX.Element function

type shapeToRenderFactory<TypeOfData> = (
    elementShape: ElementShape,
) => RenderFunction<TypeOfData>
