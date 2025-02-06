import * as path from 'node:path'
import * as fs from 'node:fs'
import { cwd } from 'node:process'

export default defineEventHandler(async (event) => {
    const filePath = path.join(cwd(), 'public', 'data', 'txt', 'test.txt')
    const data = await fs.promises.readFile(filePath, 'utf-8')
    return data
})
