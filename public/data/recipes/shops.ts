import { UUID_ZERO } from '~/types/generics/uuidV4'
import type { Shop } from '~/types/recipe/shop'

export const allShops: Array<Shop> = [
    {
        id: UUID_ZERO,
        name: 'An unknown shop',
        currency: 'BND',
        location: 'Brunei',
    },
    {
        id: '7149355c-6893-40a7-b021-1dc9af8b30f4',
        name: 'SKH',
        location: 'Kiulap',
        currency: 'BND',
    },
]
