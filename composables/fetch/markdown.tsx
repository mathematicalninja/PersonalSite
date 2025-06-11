import { ref } from 'vue'

export function useFetchMarkdown(filePath: string) {
    const markdown = ref<{ data: any; content: string } | null>(null)
    const loading = ref(true)
    const error = ref<Error | null>(null)

    fetch(`/api/content/${filePath}`)
        .then(async (res) => {
            if (!res.ok) throw new Error('Failed to fetch markdown')
            const json = await res.json()
            markdown.value = json
        })
        .catch((e) => {
            error.value = e
            markdown.value = null
        })
        .finally(() => {
            loading.value = false
        })

    return { markdown, loading, error }
}
