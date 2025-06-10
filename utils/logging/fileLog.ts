import fs from 'fs'

export function fileLog(
    logPath: string,
): (message: string, tag?: string) => void {
    function log(message: string, tag?: string) {
        fs.appendFileSync(logPath, tag + message + '\n')
    }
    return log
}
