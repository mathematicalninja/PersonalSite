export function range(int: number): Array<number> {
    var t = [...Array(int + 1).keys()]
    t.shift()
    return t
}
