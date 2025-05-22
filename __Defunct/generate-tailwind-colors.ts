// This script reads constants/colors.ts and generates tailwind.colors.js for Tailwind config
import { palette } from '../constants/colors'
import * as fs from 'fs'
import * as path from 'path'

const outputPath = path.relative('', '../tailwind.colors.js')
// const outputPath = path.resolve(__dirname, '../tailwind.colors.js')
const js = `// This file is auto-generated from constants/colors.ts\nmodule.exports = ${JSON.stringify(
    palette,
    null,
    4,
)};\n`
console.log(js)

fs.writeFileSync(outputPath, js)
console.log('Generated tailwind.colors.js from constants/colors.ts')

// TODO: yarn add -D typescript-run
// use typescript-run to run this script in precompile
// Add in a script: tailwind, reference this in precompile
