import * as path from 'node:path'
import * as fs from 'node:fs'
import { cwd } from 'node:process'
import matter from 'gray-matter'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const file = typeof query.file === 'string' ? query.file : 'test.txt'
    // Only allow .txt or .md files, prevent path traversal
    if (!/^[-\w]+\.(txt|md)$/.test(file)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid file name',
        })
    }
    const filePath = path.join(cwd(), 'content', file)
    try {
        const raw = await fs.promises.readFile(filePath, 'utf-8')
        const { data, content } = matter(raw)
        return { data, content }
    } catch (err) {
        throw createError({ statusCode: 404, statusMessage: 'File not found' })
    }
})
