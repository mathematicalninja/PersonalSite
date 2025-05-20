// -----------------------------------------------------------------------------
// Defining Consts
// -----------------------------------------------------------------------------

type GridConst = 'grid'
const gridConst: GridConst = 'grid'

type ScaleConst = 'scale'
const scaleConst: ScaleConst = 'scale'
// -----------------------------------------------------------------------------
// "option" objects
// -----------------------------------------------------------------------------

/**
 * Grid is used to define the (**variable**) scale of the elements.
 */
type UseGridToScale = {
    gridVsScale: GridConst
    grid: GridCount
}

function isGrid(
    typeObj: UseGridToScale | UseScaleToGrid,
): typeObj is UseGridToScale {
    return (typeObj as UseGridToScale).gridVsScale === gridConst
}

/**
 * a **fixed** object Scale is used to define the number of elements that can fit in the grid.

 */
type UseScaleToGrid = {
    gridVsScale: ScaleConst
}
function isScale(
    typeObj: UseGridToScale | UseScaleToGrid,
): typeObj is UseScaleToGrid {
    return (typeObj as UseScaleToGrid).gridVsScale === scaleConst
}
// -----------------------------------------------------------------------------
// Object Shapes
// -----------------------------------------------------------------------------

/**
 * shape of a JSX.Element to be rendered.
 */
export type ElementShape = {
    width: number
    height: number
}

export type GridCount = {
    x: number
    y: number
}

export type GridCountUncappedY = {
    x: number
    y?: number
}

// TODO: figure out what needs to be passed here.
type GridOption = {
    element: ElementShape
}

export type ClampDirection = 'x' | 'y' | 'up' | 'down' | 'none'

export type xy = { x: number; y: number }
