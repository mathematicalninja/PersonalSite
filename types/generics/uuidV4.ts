export type UUID = `${string}-${string}-${string}-${string}-${string}`

export const UUID_ZERO: UUID = '00000000-0000-0000-0000-000000000000'

// type hex =
//     | '0'
//     | '1'
//     | '2'
//     | '3'
//     | '4'
//     | '5'
//     | '6'
//     | '7'
//     | '8'
//     | '9'
//     | 'a'
//     | 'b'
//     | 'c'
//     | 'd'
//     | 'e'
//     | 'f'

// type quad = `${hex}${hex}${hex}${hex}`

// type trip = `${hex}${hex}${hex}`

// type nonal = `${trip}${trip}${trip}`
// // error: type too complex to represent.

// type dodecal = `${quad}${quad}${quad}${quad}`

// type uuidV4 = `${dodecal}-${quad}-${quad}-${quad}-${nonal}`
// // note this is not actually the specification for UUID v4, but a placeholder.
// // exact specification should be consulted.

// const id: uuidV4 = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// const u: uuidV4 = 3 // should error

// function isUuidV4(value: string): value is uuidV4 {
// }
