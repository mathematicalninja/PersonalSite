import { palette } from './constants/colors'
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                ...palette,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
