<script lang="tsx" setup>
    import type { JSX } from 'vue/jsx-runtime'
    import TestSuccess from '~/components/TestSuccess.vue'
    import ShowVariant from '~/Recipe/ShowVariant.vue'
    import { useIngredientStore } from '~/stores/ingredientStore'
    import type { Result } from '~/types/generics/result'
    import type { UUID } from '~/types/generics/uuidV4'
    import type {
        Ingredient,
        IngredientVariant,
    } from '~/types/recipe/ingredient'
    import { downloadData } from '~/utils/data/download'
    const ingredientStore = useIngredientStore()
    const variantStore = useIngredientVariantStore()

    // TODO: move the "Delete" button to beside the ingr name, create an "add" button beside the name input field that "commits"
    // TODO: Add a delete confirm, or an undo
    // TODO: Add variants to this page.
    const newIngredient = ref('')

    function addIngredient() {
        test.value = ingredientStore.addIngredient(newIngredient.value)
        newIngredient.value = ''
        return
    }

    const test = ref({
        success: false,
        error: ['Hi.'],
        source: ['Me.'],
    } as Result<any>)

    // {showVariant(vUUID)}  swap to vue's h() syntax to define the full variant, or make a {{"<ShowVariant> "}}component
    function add(uuid: UUID) {
        test.value = ingredientStore.newVariant(uuid)
    }
</script>

<template>
    <!-- TODO: reverse all list, so new elements are at the top, close to the "add" button. ==> `Add Ingredient` button needs to be moved to the top of the page. -->
    <!-- TODO: Move download buttons to top of page -->
    <QButton
        :onClick="
            () => {
                downloadData(
                    ingredientStore.allIngredients,
                    'allIngredients.json',
                )
            }
        "
        class="mr-2 mb-2"
        >Download all Ingredients</QButton
    >
    <QButton
        :onClick="
            () => {
                downloadData(
                    variantStore.allIngredientsVariants,
                    'allIngredientVariants.json',
                )
            }
        "
    >
        Download all Ingredient Variants
    </QButton>
    <div>
        <QButton
            @click="addIngredient"
            class="mb-4"
            >Add New Ingredient
        </QButton>
        <input
            v-model="newIngredient"
            type="text"
            placeholder="New Ingredient Name"
            class="mb-4 p-2 border rounded"
        />
    </div>

    <div class="flex flex-col-reverse">
        <div
            v-for="(ingr, index) in ingredientStore.allIngredients"
            :key="ingr.id"
            class="mb-4"
        >
            <div class="flex flex-col p-4">
                <div class="flex items-center">
                    <QButton
                        @click="ingredientStore.deleteIngredient(ingr.id)"
                        class="r-2"
                        >Delete</QButton
                    >
                    <h2 class="text-xl font-bold ml-2">{{ ingr.name }} </h2>
                    <div> </div>
                </div>

                <div class="flex-col-reverse">
                    <div
                        v-for="(vUUID, vIndex) in ingr.variants"
                        class="m-2"
                    >
                        <ShowVariant :uuid_variant="vUUID" />
                    </div>
                    <QButton
                        class="ml-2 mt-2"
                        :onClick="
                            () => {
                                add(ingr.id)
                            }
                        "
                        >Add Variant</QButton
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
