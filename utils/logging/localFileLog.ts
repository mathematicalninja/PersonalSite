import path from 'path'
import { fileLog } from './fileLog'

export function localFileLog(
    fileName: string,
): (message: string, tag?: string) => void {
    return fileLog(path.join(__dirname, fileName))
}
