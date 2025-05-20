export default function randomiseArray<T>(ar: Array<T>) {
    const A = structuredClone(ar)
    if (A.length == 0) {
        return A
    }
    return A.sort(() => Math.random() - 0.5)
}
