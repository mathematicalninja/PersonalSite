import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'

import type { Ingredient, IngredientVariant } from '~/types/recipe/ingredient'
import {
    addErrorToStack,
    type Result,
    type ResultFail,
} from '~/types/generics/result'
import type { UUID } from '~/types/generics/uuidV4'

import { allIngredients as all } from '~/public/data/recipes/ingredients'

export const useIngredientStore = defineStore('ingredient', () => {
    const allIngredients = ref<Array<Ingredient>>([...all])
    const variantStore = useIngredientVariantStore()
    // const getter = computed(() => {})

    function addIngredient(name: string): Result<Ingredient> {
        const ingredient: Ingredient = blankIngredient()
        ingredient.name = name
        // BUG: check that ingredient doesn't already exist
        // BUG: standardise the ingredient name for this check.
        // TODO: add fuzzy find to check.
        allIngredients.value.push(ingredient)
        return { success: true, result: ingredient }
    }

    function newVariant(id: UUID): Result<IngredientVariant> {
        const blank = variantStore.newVariant(id)
        if (!blank.success) {
            return {
                success: false,
                error: [`Failed to create new variant for ingredient ${id}.`],
                source: [`newVariant: ${id}`],
            }
        }
        return {
            success: true,
            result: blank.result,
        }
    }

    function getIngredientById(id: UUID): Result<Ingredient> {
        const all = allIngredients.value.find(
            (ingr: Ingredient) => ingr.id === id,
        )
        if (all === undefined) {
            return {
                success: false,
                error: [`Ingredient with id ${id} not found.`],
                source: [`getIngredientById: ${id}`],
            }
        }
        return { success: true, result: all }
    }

    function getCheapestVariantById(id: UUID): Result<IngredientVariant> {
        const ingredient = getIngredientById(id)

        if (!ingredient.success) {
            return {
                success: false,
                error: [`Ingredient with id ${id} not found.`],
                source: [`getCheapestVariantById: ${id}`],
            }
        }
        if (ingredient.result.variants.length === 0) {
            return {
                success: false,
                error: [`Ingredient with id ${id} has no variants.`],
                source: [`getCheapestVariantById: ${id}`],
            }
        }

        const costPairs = [{} as { uuid: UUID; unitCost: number }]
        const source = `getCheapestVariantById: ${id}`
        const fail: Result<IngredientVariant> = {
            success: false,
            error: [`getCheapestVariantById: varientCost for ${id} failed`],
            source: [source],
        }

        for (const variantId of ingredient.result.variants) {
            const unitCost = variantStore.getUnitCostById(variantId)
            let success = true
            if (!unitCost.success) {
                success = false

                addErrorToStack({
                    stack: fail,
                    err: {
                        success: false,
                        error: unitCost.error,
                        source: unitCost.source,
                    },
                })
                continue
            }
            costPairs.push({
                uuid: variantId,
                unitCost: unitCost.result,
            })
        }

        if (costPairs.length === 0) {
            return fail
        }

        let cheapestVariantId: UUID | undefined = undefined
        let cheapestCost: number | undefined = undefined
        for (const pair of costPairs) {
            const variantId = pair.uuid
            const cost = pair.unitCost
            if (cheapestCost === undefined || cost < cheapestCost) {
                cheapestVariantId = variantId
                cheapestCost = cost
            }
        }
        if (cheapestVariantId === undefined || cheapestCost === undefined) {
            return fail
        }
        const cheapestVariant = variantStore.getVariantById(cheapestVariantId)
        if (!cheapestVariant.success) {
            addErrorToStack({
                stack: fail,
                err: {
                    success: false,
                    error: cheapestVariant.error,
                    source: cheapestVariant.source,
                },
            })
            return fail
        }
        return {
            success: true,
            result: cheapestVariant.result,
        }

        // TODO: solve the conundrum:
        // may have a partial fail, and a partial success. We want to return a "best" effort, but still have error handling.
        // IDEA: pass the user the best effort, log the error.
    }

    function blankIngredient(): Ingredient {
        return {
            id: uuid() as UUID,
            name: '',
            variants: [],
        }
    }

    function updateIngredient(ingredient: Ingredient): Result<Ingredient> {
        const id = ingredient.id
        const index = allIngredients.value.findIndex((ingr) => ingr.id === id)
        if (index < 0) {
            // findIndex returns -1 if not found
            return {
                success: false,
                error: [`Ingredient with id ${id} not found for update.`],
                source: [`updateIngredient: ${ingredient}`],
            }
        }

        allIngredients.value[index] = ingredient
        return { success: true, result: ingredient }
    }

    function addVariantToIngredient({
        ingredientId,
        variantId,
    }: {
        ingredientId: UUID
        variantId: UUID
    }): Result<{
        ingredientId: UUID
        variantId: UUID
    }> {
        const ingredient = getIngredientById(ingredientId)

        if (ingredient.success == false) {
            return {
                success: false,
                error: [`Ingredient with id ${ingredientId} not found.`],
                source: [`addVariantToIngredient: ${ingredientId}`],
                result: {
                    ingredientId,
                    variantId,
                },
            }
        }

        const matchId = ingredient.result.variants.find((v) => v === variantId)
        if (matchId !== undefined) {
            return {
                success: false,
                error: [
                    `Variant with id ${variantId} already exists in ingredient ${ingredientId}.`,
                ],
                source: [`addVariantToIngredient: ${ingredientId}`],
                result: {
                    ingredientId,
                    variantId,
                },
            }
        }

        ingredient.result.variants.push(variantId)

        return { success: true, result: { ingredientId, variantId } }
    }

    /**
     *
     * @param id
     * @returns success state, and the deleted ingredient if successful. (for undo purposes)
     */
    function deleteIngredient(id: UUID): Result<Ingredient> {
        const index = allIngredients.value.findIndex((ingr) => ingr.id === id)

        if (index < 0) {
            return {
                success: false,
                error: [`Ingredient with id ${id} not found for deletion.`],
                source: [`deleteIngredient: ${id}`],
            }
        }

        const ingredient = allIngredients.value[index]
        if (ingredient.variants.length > 0) {
            const err: ResultFail<{ variantId: UUID; ingredientId: UUID }> = {
                success: false,
                error: [],
                source: [],
            }
            for (const variantId of ingredient.variants) {
                const deleted = variantStore.deleteVariant(variantId)
                // TODO: handle these errors, please.
                if (!deleted.success) {
                    addErrorToStack({
                        stack: err,
                        err: {
                            success: false,
                            error: [
                                `failed to delete variant ${variantId} from ingredient ${id}.`,
                            ],
                            source: [`deleteIngredient: ${id}`],
                        },
                    })
                }
            }
        }
        allIngredients.value.splice(index, 1)
        return { success: true, result: ingredient }
    }

    function deleteVariantFromIngredient({
        ingredientId,
        variantId,
    }: {
        ingredientId: UUID
        variantId: UUID
    }): Result<{ variantId: UUID }> {
        const ingredient = getIngredientById(ingredientId)

        if (!ingredient.success) {
            return {
                success: false,
                error: [`Ingredient with id ${ingredientId} not found.`],
                source: [`deleteVariantFromIngredient: ${ingredientId}`],
            }
        }

        const index = ingredient.result.variants.findIndex(
            (v) => v === variantId,
        )
        if (index < 0) {
            return {
                success: false,
                error: [
                    `Variant with id ${variantId} not found in ingredient ${ingredientId}.`,
                ],
                source: [
                    `deleteVariantFromIngredient: variantId = ${variantId}, ingredientId = ${ingredientId} `,
                ],
            }
        }

        ingredient.result.variants.splice(index, 1)
        return { success: true, result: { variantId } }
    }

    return {
        allIngredients,
        // getter,
        blankIngredient, // Create blank (not added)
        addIngredient, // Add
        newVariant, // Add
        getIngredientById, // Read
        getCheapestVariantById, //read
        updateIngredient, // Update
        addVariantToIngredient, // Update
        deleteIngredient, // Delete
        deleteVariantFromIngredient, // Delete
    }
})
