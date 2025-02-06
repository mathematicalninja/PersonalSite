import * as path from 'node:path'
import * as fs from 'node:fs'

export default defineEventHandler(async (event) => {
    // const testPath = path.join(cwd(), "public", "data", "txt", "test.txt");

    const filePath = path.join(
        process.cwd(),
        'public',
        'data',
        'txt',
        'test.txt',
    )
    const data = await fs.promises.readFile(filePath, 'utf-8')
    return data
})
