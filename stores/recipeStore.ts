import { v4 as uuid } from 'uuid'

import allRecipes from '~/public/data/recipes/all'
import type { Recipe } from '~/types/recipe/recipe'

// TODO: refactor recipe data to be graphQL api endpoint.
import { defineStore } from 'pinia'
import type { Result } from '~/types/generics/result'
import type { UUID } from '~/types/generics/uuidV4'

export const useRecipeStore = defineStore('recipe', () => {
    const all = ref(allRecipes)

    function newRecipe() {
        return {
            id: uuid(),
            name: '',
            ingredients: [],
            tags: [],
        }
    }

    function addRecipe(recipe: Recipe): Recipe {
        all.value.push(recipe)
        return recipe
    }

    function updateRecipe(recipe: Recipe): Result<Recipe> {
        const id = recipe.id
        const index = all.value.findIndex((rec) => rec.id === id)
        if (index >= 0) {
            all.value[index] = recipe
            return { result: recipe, success: true }
        } else {
            console.warn(`Recipe with id ${id} not found for update.`)
            return {
                success: false,
                error: [`Recipe with id ${id} not found for update.`],
                source: [`updateRecipe: id ${id}`],
            }
        }
    }

    /**
     *
     * @param id
     * @returns success state, and the deleted recipe if successful. (for undo purposes)
     */
    function deleteRecipe(id: UUID): Result<Recipe> {
        const index = all.value.findIndex((rec) => rec.id === id)
        if (index >= 0) {
            const recipe = all.value[index]
            all.value.splice(index, 1)
            return { success: true, result: recipe }
        } else {
            return {
                success: false,
                error: [`Recipe with id ${id} not found for deletion.`],
                source: [`deleteRecipe: id ${id}`],
            }
        }
    }

    function getRecipeById(id: UUID): Result<Recipe> {
        const recipe = all.value.find((recipe) => recipe.id === id)
        if (recipe) {
            return { success: true, result: recipe }
        } else {
            return {
                success: false,
                error: [`Recipe with id ${id} not found.`],
                source: [`getRecipeById: id ${id}`],
            }
        }
    }

    return {
        all,
        newRecipe, // Create blank (not added)
        addRecipe, // Add
        getRecipeById, // Read
        updateRecipe, // Update
        deleteRecipe, // Delete
    }
})
