import type { Recipe } from '~/pages/demos/recipeCoster.vue'

const all: Array<Recipe> = [
    {
        name: 'Dinner Rolls',
        ingredients: [
            {
                name: 'Bread Flour',
                recipeQuantity: 375,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Sugar',
                recipeQuantity: 50,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Yeast',
                recipeQuantity: 7,
                shopCost: 0,
                shopQuantity: 55,
            },
            {
                name: 'Salt',
                recipeQuantity: 1.75,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Water',
                recipeQuantity: 250,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Vegetable Oil',
                recipeQuantity: 45,
                shopCost: 0,
                shopQuantity: 0,
            },
        ],
    },
    {
        name: 'Plain Loaf',
        ingredients: [
            {
                name: 'Plain Flour',
                recipeQuantity: 375,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Sugar',
                recipeQuantity: 50,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Yeast',
                recipeQuantity: 7,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Salt',
                recipeQuantity: 1.75,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Water',
                recipeQuantity: 250,
                shopCost: 0,
                shopQuantity: 0,
            },
            {
                name: 'Milk',
                recipeQuantity: 45,
                shopCost: 0,
                shopQuantity: 0,
            },
        ],
    },
]
export default all

// TODO: allow for recipe.md to have a data field that contains the ingredients, then import across all of them to a single exportable array of json here.
