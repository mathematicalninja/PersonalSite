// --------------------------------------------------------
// Recipe Data
// --------------------------------------------------------

import type { UUID } from '../generics/uuidV4'
import type { Quality } from './ingredient'
import type { RecipeTag } from './tags'

export type Recipe = {
    id: UUID //recipe uuidv4
    name: string
    ingredients: Array<{
        ingredientId: UUID
        quantity: number
        quality?: Quality
    }>
    tags?: Array<RecipeTag>
}
