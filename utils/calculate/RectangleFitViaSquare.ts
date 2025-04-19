export function ExactRectangleFitViaSquare(
    inner: { width: number; height: number },
    outer: { width: number; height: number },
    goalN: number,
): { xCount: number; yCount: number; scaleFactor: number } {
    // This function works by changing variables to use an innerObject that is a perfect square (keeping x-value fixed), then fitting that inside the outerObject along the y-value.
    // Then simple algebra lets us count how many squares should fit inside the sub-square of the outerObject. (i.e. how many times the innerObject fits inside the outerObject vertically)
    // We can then use this to calculate the number of times the small square fits inside the outer rectangle horizontally (scaled aclong the y-axis).
    //
    // We then change the variables back to calculate the scale factor needed to fit the innerObject inside the outerObject without distortion.
    const innerRatio = inner.width / inner.height
    const outerRatio = outer.width / outer.height

    // by taking (inner.height := inner.height * innerRatio) we get the width of the innerObject if it were a square.
    // Then by taking (outer.width := outer.width * innerRatio) we get a square subsection of the rescaled outerObject to preform calculoations in.

    // Algebra gives:
    const squareRatio = innerRatio / outerRatio

    const yCount = Math.sqrt(goalN / squareRatio)
    const xCount = yCount * squareRatio

    const scaleFactor = (xCount * inner.width) / outer.width

    return { xCount, yCount, scaleFactor }
}

export function roundedRectangleFitViaSquare(
    inner: { width: number; height: number },
    outer: { width: number; height: number },
    goalN: number,
): { xCount: number; yCount: number } {
    let N = goalN
    if (notInteger(goalN)) {
        N = Math.floor(goalN)
    }
    const { xCount, yCount, scaleFactor } = ExactRectangleFitViaSquare(
        inner,
        outer,
        N,
    )
    // // What we're doing here is checking whether there is more "space" in the x-axis or y-axis. That will tell us which direction we should use as our rounding "goal".

    // const xSpace =
    //     (outer.width - inner.width * scaleFactor) / Math.floor(xCount)
    // const ySpace =
    //     (outer.height - inner.height * scaleFactor) / Math.floor(yCount)

    // const xBigger = xSpace >= ySpace

    // // if there is more "space" along the x-axis, this means that we need to round to the y-axis to fit the most inside the outerFrame.

    // const xRatio = inner.width / outer.width
    // const yRatio = inner.height / outer.height
    // const roundedScaleFactor = xBigger
    //     ? Math.floor(yCount * yRatio)
    //     : Math.floor(xCount * xRatio)

    // Idea: check floor(xCount)*roof(yCount) vs roof(xCount)*floor(yCount)
    // Check which will actually fit goalN many innerObjects inside outerObject.
    // // const { xRoundUp, yRoundUp } = xyRound(xCount, yCount, goalN)

    const xUpYDown: boolean = upperLower(xCount, yCount, goalN)
    const yUpXDown: boolean = upperLower(yCount, xCount, goalN)

    if (!xUpYDown && !yUpXDown) {
        // neither partial round works, need to round both up
        return {
            xCount: Math.ceil(xCount),
            yCount: Math.ceil(yCount),
        }
    }

    if (xUpYDown && !yUpXDown) {
        return {
            xCount: Math.ceil(xCount),
            yCount: Math.floor(yCount),
        }
    }
    if (yUpXDown && !xUpYDown) {
        return {
            xCount: Math.floor(xCount),
            yCount: Math.ceil(yCount),
        }
    }
    if (xUpYDown && yUpXDown) {
        // both partial rounds work, choose the one that fits the largest innerObhects
        const xUpScaleFactor = getScaleFactor(
            inner,
            outer,
            Math.ceil(xCount),
            Math.floor(yCount),
        )
        const yUpScaleFactor = getScaleFactor(
            inner,
            outer,
            Math.floor(xCount),
            Math.ceil(yCount),
        )
        const xBigger = xUpScaleFactor > yUpScaleFactor

        if (xBigger) {
            return {
                xCount: Math.ceil(xCount),
                yCount: Math.ceil(yCount),
            }
        }
        return {
            xCount: Math.floor(xCount),
            yCount: Math.floor(yCount),
        }
    }

    // Note that the above conditionals check all 4 possible boolean values of xUpYDown and yUpXDown, so this return statement should not be reached, but .ts isn't always the britghtest.
    return { xCount, yCount }

    //
}

function getScaleFactor(
    inner: { width: number; height: number },
    outer: { width: number; height: number },
    xCount: number,
    yCount: number,
): number {
    const xScale = (xCount * inner.width) / outer.width
    const yScale = (yCount * inner.height) / outer.height
    return Math.min(xScale, yScale)
}

function notInteger(n: number): boolean {
    return n % 1 !== 0
}

function isInteger(n: number): boolean {
    return n % 1 === 0
}

/**
 *
 * @param a number to be rounded up
 * @param b number to be rounded down
 * @param n minimum number needed
 * @returns "ab" > n
 */
function upperLower(a: number, b: number, n: number): boolean {
    return Math.ceil(a) * Math.floor(b) > n
}
