import fs from 'fs'
import path from 'path'

export function fileLog(
    logPath: string,
): (message: string, tag?: string) => void {
    function log(message: string, tag?: string) {
        fs.appendFileSync(logPath, tag + message + '\n')
    }
    return log
}

export function localFileLog(
    fileName: string,
): (message: string, tag?: string) => void {
    return fileLog(path.join(__dirname, fileName))
}
