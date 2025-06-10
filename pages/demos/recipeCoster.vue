<script lang="ts" setup>
    // TODO: make recipe column names width actually match the content width.

    // Load recipes from ~/public/data/recipes/all.json
    import allRecipes from '~/public/data/recipes/all'
    import type { Ingredient } from '~/types/recipe/ingredient'
    import type { Recipe } from '~/types/recipe/recipe'
    import { downloadData } from '~/utils/data/download'
    const about = await useFetch('/api/txt?file=widgets/recipe.md')
    // TODO: refactor api to ensure this works

    const recipes = ref(allRecipes as Array<Recipe>)

    const recipeStore = useRecipeStore()
    const ingredientStore = useIngredientStore()
    const ingredientVarientStore = useIngredientVariantStore()

    const itemCost = (item: Ingredient) => {
        if (item.shopQuantity === 0) {
            return 0
        }
        return item.shopCost * (item.recipeQuantity / item.shopQuantity)
    }
    const getCost = (recipe: Recipe) => {
        const cost = recipe.ingredients.reduce(
            (total, item) => total + itemCost(item),
            0,
        )
        return cost.toFixed(2)
    }
    const addIngredient = (recipe: Recipe) => {
        recipe.ingredients.push({
            name: '',
            recipeQuantity: 0,
            shopCost: 0,
            shopQuantity: 0,
        })
    }
    const removeIngredient = ({
        recipe,
        itemIdx,
    }: {
        recipe: Recipe
        itemIdx: number
    }) => {
        recipe.ingredients.splice(itemIdx, 1)
    }
    // // Note: if a recipe store is to be implemented to allow saving of recipes, then the following or similar is needed rather than simply v-models on input fields.
    // const updateIngredient = (
    //     item: Ingredient,
    //     field: 'recipeQuantity' | 'shopCost' | 'shopQuantity',
    //     value: number,
    // ) => {
    //     item[field] = value
    // }
    // const updateName = (item: Ingredient, value: string) => {
    //     item.name = value
    // }

    // TODO: add in a "autocomplete" for ingredient names, then use recipe.splice(itemIdx, i, ingredientStore(ingredientName)) to replace the item with the selected ingredient from the store.
</script>

<template>
    <RenderMarkdownBlurb
        v-if="about !== null && about.data.value !== null"
        :markdown="about.data.value"
    />
    <AlignmentCenterDiv>
        <QCard class="w-1/3 p-2 m-2">
            <div>
                This is a prototype (now defunct) for an idea to help my wife
                understand how much recipes *actually* cost: to buy, to make,
                and per portion, all of which may be different.
            </div>
            <div
                >Since I made this prototype, the scope has increased as my wife
                gave feedback on what features she'd find useful.</div
            >
        </QCard>
    </AlignmentCenterDiv>
    <div
        v-for="(recipe, index) in recipes"
        :key="index"
        class="mb-4"
    >
        <h2 class="text-2xl font-bold mb-4"
            >Recipe #{{ index + 1 }}: {{ recipe.name }}</h2
        >
        <div class="flex flex-col items-center justify-center h-screen">
            <div class="mb-2 flex-row flex p-auto">
                <div class="columns-5">
                    <div class="border p-2 w-44">Ingredient</div>
                    <div class="border p-2 w-44">Amount Needed</div>
                    <div class="border p-2 w-44">Quantity Sold</div>
                    <div class="border p-2 w-44">Cost to buy</div>
                    <div class="border p-2 w-44"></div>
                </div>
            </div>
            <div
                v-for="(item, index) in recipe.ingredients"
                :key="index"
                class="mb-2"
            >
                <input
                    v-model="item.name"
                    placeholder="Ingredient Name"
                    class="border p-2"
                />
                <input
                    v-model.number="item.recipeQuantity"
                    type="number"
                    placeholder="Ingredient Quantity"
                    class="border p-2 ml-2"
                />
                <input
                    v-model.number="item.shopQuantity"
                    type="number"
                    placeholder="Shop's Quantity"
                    class="border p-2 ml-2"
                />
                <input
                    v-model.number="item.shopCost"
                    type="number"
                    placeholder="Shop's Cost"
                    class="border p-2 ml-2"
                />
                <QButton
                    @click="
                        removeIngredient({ itemIdx: index, recipe: recipe })
                    "
                    class="ml-2"
                    >Remove</QButton
                >
                <span class="p-2">Cost: ${{ itemCost(item).toFixed(2) }}</span>
            </div>
            <QButton
                @click="addIngredient(recipe)"
                class="mt-4"
                >Add Ingredient</QButton
            >
            <div class="mt-4"
                >Total Cost:
                <span class="font-bold">${{ getCost(recipe) }}</span></div
            >
        </div>
    </div>
    <QButton
        @click="
            () =>
                recipes.push({
                    name: '',
                    ingredients: [
                        {
                            name: '',
                            recipeQuantity: 0,
                            shopCost: 0,
                            shopQuantity: 0,
                        },
                    ],
                })
        "
        class=""
        >Add Recipe</QButton
    >
    <QButton
        :onClick="
            () => {
                downloadData(recipes, 'recipes.json')
            }
        "
        >Download Recipes</QButton
    >
</template>

<style></style>
