export default function randomiseArray(ar: any[]) {
    const A = structuredClone(ar)
    if (A.length == 0) {
        return A
    }
    return A.sort(() => Math.random() - 0.5)
}
