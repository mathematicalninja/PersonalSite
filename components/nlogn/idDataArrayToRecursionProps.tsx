// TODO: This is the next step in creating the recursive application: the enttry point for the logic.

// Type setup

// setup functions
function chooseGridOrScale(typeObj: useGridToScale | useScaleToGrid) {
    if (isGrid(typeObj)) {
        return gridConst
    }
    return scaleConst
}

// processing functions

// Return value generation functions
type inputProps = {}
// Need to split the logic for using the grid to determine the scale (only when the render functions are scalable) and when the scale determines the grid.
