import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import { allIngredientsVariants as all } from '~/public/data/recipes/ingredientVariants'
import {
    IngredientVariantPartial_Keys,
    type Ingredient,
    type IngredientVariant,
    type IngredientVariantPartial,
} from '~/types/recipe/ingredient'
import { useIngredientStore } from '~/stores/ingredientStore'
import type { Result, ResultFail } from '~/types/generics/result'
import { UUID_ZERO, type UUID } from '~/types/generics/uuidV4'

export const useIngredientVariantStore = defineStore(
    'ingredientVariant',
    () => {
        const ingredientStore = useIngredientStore()

        const allIngredientsVariants = ref<{
            [variantId: UUID]: IngredientVariant
        }>({
            ...all,
        })

        function getAllVariantsByIngredientId(
            ingredientId: UUID,
        ): Result<Array<IngredientVariant>> {
            const ingredient = ingredientStore.getIngredientById(ingredientId)

            if (!ingredient.success) {
                return {
                    success: false,
                    error: [`Ingredient with id ${ingredientId} not found.`],
                    source: [`getAllVariantsByIngredientId: ${ingredientId}`],
                }
            }

            const idArray = ingredient.result.variants
            const r: Array<IngredientVariant> = []

            for (const id of idArray) {
                if (allIngredientsVariants.value[id] === undefined) {
                    console.warn(
                        `Variant with id ${id} not found in state for ingredient ${ingredientId}.`,
                    )
                }
                r.push(allIngredientsVariants.value[id])
            }

            return {
                success: true,
                result: r,
            }
        }

        function getVariantById(id: UUID): Result<IngredientVariant> {
            const ing = allIngredientsVariants.value[id]
            if (ing === undefined) {
                return {
                    error: [`Ingredient variant with id ${id} not found.`],
                    source: [`getVariantById: ${id}`],
                    success: false,
                }
            }

            return { success: true, result: ing }
        }

        function getUnitCostById(id: UUID): Result<number> {
            const variant = getVariantById(id)
            if (!variant.success) {
                return {
                    success: false,
                    error: [`Variant with id ${id} not found.`],
                    source: [`getUnitCostById: ${id}`],
                }
            }
            const ing = variant.result
            if (ing.shopQuantity === 0) {
                return {
                    success: false,
                    error: [`Variant with id ${id} has no shop quantity.`],
                    source: [`getUnitCostById: ${id}`],
                }
            }
            return {
                success: true,
                result: ing.shopCost / ing.shopQuantity,
            }
        }

        function blankVariant(): IngredientVariant {
            return {
                id: UUID_ZERO,
                ingredientId: UUID_ZERO,

                shopCost: 0,
                shopQuantity: 0,
                shopId: UUID_ZERO,

                brand: '',
                // brand: UUID_ZERO,
            }
        }

        function newVariant(ingredientId: UUID): Result<IngredientVariant> {
            const variant = blankVariant()
            variant.id = uuid() as UUID
            variant.ingredientId = ingredientId

            // BUG: all this error is wrong.
            if (allIngredientsVariants.value[variant.id] !== undefined) {
                return {
                    success: false,
                    error: [
                        `Ingredient with id ${ingredientId} already exists.`,
                    ],
                    source: [`newVariant: ${ingredientId}`],
                }
            }

            // Add to the ingredient's variants
            const ingredient = ingredientStore.getIngredientById(ingredientId)
            if (!ingredient.success) {
                return {
                    success: false,
                    error: [
                        `Ingredient with id ${ingredientId} cannot be found.`,
                    ],
                    source: [`newVariant: ${ingredientId}`],
                }
            }

            const added = ingredientStore.addVariantToIngredient({
                ingredientId: ingredient.result.id,
                variantId: variant.id,
            })
            if (!added.success) {
                return {
                    success: false,
                    error: added.error,
                    source: [`newVariant: ${ingredientId}`],
                }
            }

            // state.value[variant.id] = variant
            addVariant(variant)
            return { success: true, result: variant }
        }

        function addVariant(
            variant: IngredientVariant,
        ): Result<IngredientVariant> {
            if (variant.id === UUID_ZERO) {
                return {
                    success: false,
                    error: [`Cannot add variant with id ${UUID_ZERO}.`],
                    source: ['addVariant'],
                }
            }
            if (allIngredientsVariants.value[variant.id] !== undefined) {
                return {
                    success: false,
                    error: [`Variant with id ${variant.id} already exists.`],
                    source: [`addVariant: ${variant.id}`],
                }
            }
            allIngredientsVariants.value[variant.id] = variant
            return { success: true, result: variant }
        }

        function updateVariant({
            variant_updated,
            idVariant,
        }: {
            variant_updated: IngredientVariantPartial
            idVariant: UUID
        }): Result<IngredientVariant> {
            if (idVariant === UUID_ZERO) {
                return {
                    success: false,
                    error: [`Cannot update a variant with id ${UUID_ZERO}.`],
                    source: ['updateVariant'],
                }
            }
            const storedVariant = getVariantById(idVariant)
            if (!storedVariant.success) {
                return {
                    success: false,
                    error: [
                        `Variant with id ${idVariant} not found for updating.`,
                    ],
                    source: [`updateVariant: ${idVariant}`],
                }
            }

            const variant = storedVariant.result

            for (const key of IngredientVariantPartial_Keys) {
                const val = variant_updated[key]

                if (val === undefined) {
                    continue
                }

                // @ts-ignore
                variant[key] = val
            }
            allIngredientsVariants.value[idVariant] = variant

            return { success: true, result: variant }
        }

        function deleteVariant(id: UUID): Result<IngredientVariant> {
            // TODO: `deleteVariant`
            // 1. const variant = getVariantById(id)
            // 2. if (!variant.success) return fail<id>
            // 3. const deletedVariant = ingredientStore.removeVariantFromIngredient({
            //    ingredientId: variant.result.ingredientId,
            //    variantId: id,
            // })
            // 4. if (!deletedVariant.success) return fail<id>
            // 5. delete allIngredientsVariants.value[id]
            // 6. return success<variant>
            const variant = getVariantById(id)
            if (!variant.success) {
                return {
                    success: false,
                    error: [`Variant with id ${id} not found for deletion.`],
                    source: [`deleteVariant: ${id}`],
                }
            }
            const deletedVariant = ingredientStore.deleteVariantFromIngredient({
                ingredientId: variant.result.ingredientId,
                variantId: id,
            })
            if (!deletedVariant.success) {
                return {
                    success: false,
                    error: deletedVariant.error,
                    source: [`deleteVariant: ${id}`],
                }
            }
            delete allIngredientsVariants.value[id]
            return { success: true, result: variant.result }
        }

        return {
            allIngredientsVariants,
            blankVariant: blankVariant, // Create blank (not added)
            newVariant: newVariant, // Create
            addVariant, // Add
            getVariantById, // Read
            getAllVariantsByIngredientId, // Read
            getUnitCostById, // Read
            updateVariant, // Update
            deleteVariant, // Delete
        }
    },
)
