<template>
    <AlignmentCenterDiv>
        <QCard class="w-1/3 p-2 m-2"
            >The construction of this page will take fuzzy finding of
            ingredients by name, mapping that to the UUIDs elsewhere in the
            datastores, etc. I haven't done that yet, so this page is left
            "blank"</QCard
        >
    </AlignmentCenterDiv>
</template>

<script lang="ts" setup>
    const recipeStore = useRecipeStore()
    const ingredientStore = useIngredientStore()
</script>

<style></style>
