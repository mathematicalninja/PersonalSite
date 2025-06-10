// --------------------------------------------------------
// Raw data about ingredients
// --------------------------------------------------------

import type { UUID } from '../generics/uuidV4'
import type { IngredientTag } from './tags'

/**
 * Ingredient base type
 * @param id: uuidv4
 */
export type Ingredient = {
    id: UUID // ingredient's uuidv4
    name: string
    variants: Array<UUID> // array of **global** uuidv4 of IngredientVariant

    tags?: Array<IngredientTag>
}

/**
 *
 * @param id instance's uuidv4
 * @param ingredientId ingredient's **global** uuidv4
 * @param shopId if not set, item is treated as having unknown origin
 *
 * The specific ingredient available at a specific shop.
 * Can have duplicates across the same **Ingredient** uuid, even within a shop.
 */
export type IngredientVariant = {
    id: UUID // instance's uuidv4
    ingredientId: UUID // uuidv4

    shopId: UUID // uuidv4

    shopCost: number
    shopQuantity: number

    brand?: string
}

/**
 * A partial ingredient variant without the need for a UUID.
 */
export type IngredientVariantPartial = Partial<
    Omit<IngredientVariant, 'id' | 'ingredientId'>
>

export const IngredientVariantPartial_Keys: Array<
    | 'shopId' //
    | 'shopCost'
    | 'shopQuantity'
    | 'brand'
> = [
    'shopId', //
    'shopCost',
    'shopQuantity',
    'brand',
]

/**
 * The **relative** quality of the ingredient.
 */
export type Quality =
    | 'budget' //
    | 'average'
    | 'luxury'
