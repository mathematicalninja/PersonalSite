import { readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import { defineEventHandler, getRouterParam, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const file = getRouterParam(event, 'file')
    if (!file || !file.endsWith('.md')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Only .md files are allowed',
        })
    }
    const filePath = join(process.cwd(), 'content', file)
    try {
        const raw = await readFile(filePath, 'utf-8')
        const parsed = matter(raw)
        return { data: parsed.data, content: parsed.content }
    } catch (e) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Markdown file not found',
        })
    }
})
