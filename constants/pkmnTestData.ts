import type { NationalNum } from '~/types/component/pkmn'
import type {
    Atom,
    NlognArray,
    NlognArray_Atoms,
    SortedArray,
} from '~/types/nlogn/dataStruct'

export const testPiles: Array<SortedArray<NationalNum>> = [
    {
        state: 'sorted',
        data: [
            { state: 'atom', data: 69 },
            { state: 'atom', data: 70 },
            { state: 'atom', data: 71 },
        ],
    },
    {
        state: 'sorted',
        data: [
            { state: 'atom', data: 13 },
            { state: 'atom', data: 14 },
            { state: 'atom', data: 15 },
        ],
    },
    {
        state: 'sorted',
        data: [
            { state: 'atom', data: 41 },
            { state: 'atom', data: 42 },
            { state: 'atom', data: 169 },
        ],
    },
    {
        state: 'sorted',
        data: [
            { state: 'atom', data: 92 },
            { state: 'atom', data: 93 },
            { state: 'atom', data: 94 },
        ],
    },
]

export const testAtoms: Array<Atom<NationalNum>> = [
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

export const testMixPiles: Array<Atom<NationalNum> | SortedArray<NationalNum>> =
    [
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
        // Eevee
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
