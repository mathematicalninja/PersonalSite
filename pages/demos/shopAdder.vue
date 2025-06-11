<script lang="ts" setup>
    import { useShopStore } from '~/stores/shopStore'
    import { UUID_ZERO } from '~/types/generics/uuidV4'
    import { allCurrencies, currencyLookup } from '~/types/recipe/currency'

    import { downloadData } from '~/utils/data/download'

    const shopStore = useShopStore()
</script>

<template>
    <div class="flex flex-col">
        <div
            v-for="(shop, index) in shopStore.allShops"
            :key="index"
            class="mb-4"
        >
            <div v-if="shop.id !== UUID_ZERO">
                <h2 class="text-xl font-bold mb-2"
                    >{{ shop.name }} - {{ shop.location }}</h2
                >
                <div class="flex items-center mb-2">
                    <input
                        v-model="shop.name"
                        placeholder="Shop Name"
                        class="border p-2 w-64"
                    />
                    <input
                        v-model="shop.location"
                        placeholder="Shop Location"
                        class="border p-2 ml-2 w-64"
                    />
                    <select
                        v-model="shop.currency"
                        class="border p-2 ml-2 w-64"
                    >
                        <option
                            v-for="(currency, idx) in allCurrencies"
                            :key="idx"
                            :value="currency"
                            >{{ currencyLookup(currency) }}
                            {{ currency }}</option
                        >
                    </select>
                    <QButton
                        @click="shopStore.deleteShop(shop.id)"
                        class="ml-2"
                        >Remove</QButton
                    >
                </div>
            </div>
        </div>

        <QButton
            @click="shopStore.addShop('')"
            class="mb-4"
            >Add New Shop
        </QButton>
    </div>
    <QButton
        :onClick="
            () => {
                downloadData(shopStore.allShops, 'allShops.json')
            }
        "
        >Download all shops</QButton
    >
</template>

<style></style>
