<template>
    <div v-if="variant.success">
        <Icon
            name="lucide:octagon-x"
            :onclick="deleteVariant"
            class="cursor-pointer text-destructive-foreground mr-2"
        />
        <input
            v-model="variant.result.brand"
            type="text"
            placeholder="Brand"
            class="mr-2 p-2 border rounded"
        />

        <input
            v-model="variant.result.shopQuantity"
            type="number"
            placeholder="Quantity"
            class="mr-2 p-2 border rounded"
        />
        $
        <input
            v-model="variant.result.shopCost"
            type="number"
            placeholder="Cost"
            class="mr-2 p-2 border rounded"
        />
        <!-- Note that shopId is not a very helpful thing to expose to the user, ==> shopStore.get(id) is better. -->
        <!-- Convert to a shop lookup (dropdown/fuzzy find) -->
        <!-- Note the `&& false`, this is to hide the shop UUID until shop name matching is supported. -->
        <!-- <input
            v-if="
                variant.result.shopId !== UUID_ZERO &&
                variant.result.shopId !== undefined &&
                false
            "
            v-model="variant.result.shopId"
            type="text"
            placeholder="Shop ID"
            class="mr-2 p-2 border rounded"
        /> -->
        <span
            class="mr-2 p-2 border rounded"
            v-if="
                variant.result.shopId !== UUID_ZERO &&
                variant.result.shopId !== undefined
            "
        >
            {{ shopStore.getShopById(variant.result.shopId).result?.name }} -
            {{ shopStore.getShopById(variant.result.shopId).result?.location }}
        </span>
        <!-- NOTE: current implementation doesn't require manual updating of variants -->
        <!-- <QButton
            :onClick="
                () => {
                    if (variant.success) {
                        update(variant.result)
                    }
                }
            "
            >Update</QButton
        > -->
    </div>
</template>

<script lang="ts" setup>
    import { UUID_ZERO, type UUID } from '~/types/generics/uuidV4'
    import type { IngredientVariant } from '~/types/recipe/ingredient'

    const variantStore = useIngredientVariantStore()
    const shopStore = useShopStore()

    const props = defineProps<{
        uuid_variant: UUID
    }>()

    const variant = ref(variantStore.getVariantById(props.uuid_variant))
    function update(ingrVariant: IngredientVariant) {
        variantStore.updateVariant({
            idVariant: props.uuid_variant,
            variant_updated: ingrVariant,
        })
    }

    function deleteVariant() {
        variantStore.deleteVariant(props.uuid_variant)
    }
</script>

<style></style>
