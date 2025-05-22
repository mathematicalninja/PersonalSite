import { palette as sourcePalette } from '../constants/colors'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatedPalette = require('../precompile/tailwind.colors.js')

describe('Palette agreement', () => {
  it('matches all keys/values from the source palette in the generated Tailwind palette', () => {
    (Object.keys(sourcePalette) as Array<keyof typeof sourcePalette>).forEach(key => {
      expect(generatedPalette[key]).toEqual(sourcePalette[key])
    })
  })
})
