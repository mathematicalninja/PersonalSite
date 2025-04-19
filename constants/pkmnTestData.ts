import type { idData } from '~/Factory/DataRender'
import type { SortAtom, SortedArray } from '~/types/sorting'

export const testSortedPiles: Array<SortedArray<idData>> = [
    // Starters
    {
        // Bulbasaur
        state: 'sorted',
        data: [
            { state: 'atom', data: 1 },
            { state: 'atom', data: 2 },
            { state: 'atom', data: 3 },
        ],
    },
    {
        // Charmander
        state: 'sorted',
        data: [
            { state: 'atom', data: 4 },
            { state: 'atom', data: 5 },
            { state: 'atom', data: 6 },
        ],
    },
    {
        // Squirtle
        state: 'sorted',
        data: [
            { state: 'atom', data: 7 },
            { state: 'atom', data: 8 },
            { state: 'atom', data: 9 },
        ],
    },
    // Bugs
    {
        // Caterpie
        state: 'sorted',
        data: [
            { state: 'atom', data: 10 },
            { state: 'atom', data: 11 },
            { state: 'atom', data: 12 },
        ],
    },
    {
        // Weedle
        state: 'sorted',
        data: [
            { state: 'atom', data: 13 },
            { state: 'atom', data: 14 },
            { state: 'atom', data: 15 },
        ],
    },
]

export const testAtoms: Array<SortAtom<idData>> = [
    // Eeveeloutions
    { state: 'atom', data: 133 },
    { state: 'atom', data: 134 },
    { state: 'atom', data: 135 },
    { state: 'atom', data: 136 },
    { state: 'atom', data: 196 },
    { state: 'atom', data: 197 },
    { state: 'atom', data: 470 },
    { state: 'atom', data: 471 },
    { state: 'atom', data: 700 },
]

export const testMixPiles: Array<SortAtom<idData> | SortedArray<idData>> = [
    // Starters
    {
        // Bulbasaur
        state: 'sorted',
        data: [
            { state: 'atom', data: 1 },
            { state: 'atom', data: 2 },
            { state: 'atom', data: 3 },
        ],
    },
    { state: 'atom', data: 133 },
    {
        // Charmander
        state: 'sorted',
        data: [
            { state: 'atom', data: 4 },
            { state: 'atom', data: 5 },
            { state: 'atom', data: 6 },
        ],
    },
    {
        // Squirtle
        state: 'sorted',
        data: [
            { state: 'atom', data: 7 },
            { state: 'atom', data: 8 },
            { state: 'atom', data: 9 },
        ],
    },
    // Bugs
    {
        // Caterpie
        state: 'sorted',
        data: [
            { state: 'atom', data: 10 },
            { state: 'atom', data: 11 },
            { state: 'atom', data: 12 },
        ],
    },
    {
        // Weedle
        state: 'sorted',
        data: [
            { state: 'atom', data: 13 },
            { state: 'atom', data: 14 },
            { state: 'atom', data: 15 },
        ],
    },
    // Eeveeloutions
    { state: 'atom', data: 134 },
    { state: 'atom', data: 135 },
    { state: 'atom', data: 136 },
    { state: 'atom', data: 196 },
    { state: 'atom', data: 197 },
    { state: 'atom', data: 470 },
    { state: 'atom', data: 471 },
    { state: 'atom', data: 700 },
]
