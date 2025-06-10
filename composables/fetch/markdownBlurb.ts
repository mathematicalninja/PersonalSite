const about = await useFetch('/api/txt?file=about.md')
const aboutMD = computed(() => {
    if (about !== null && about.data.value !== null) {
        return about.data.value
    }
    return { data: { 1: 'any' }, content: 'string' }
})

export default function useFetchMarkdownBlurb(fileName: string) {
    const blurb = ref<{ data: any; content: string } | null>(null)
    const loading = ref(true)
    const error = ref<Error | null>(null)

    fetch(`/api/txt?file=${fileName}`)
        .then(async (res) => {
            if (!res.ok) throw new Error('Failed to fetch markdown')
            const json = await res.json()
            blurb.value = json
        })
        .catch((e) => {
            error.value = e
            blurb.value = null
        })
        .finally(() => {
            loading.value = false
        })

    return computed(() => {
        if (blurb.value !== null && blurb.value.data !== null) {
            return blurb.value
        }
    })
}
