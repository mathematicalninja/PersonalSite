import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import type { Shop } from '~/types/recipe/shop'
import type { currency } from '~/types/recipe/currency'

import { allShops as allShopsDefault } from '~/public/data/recipes/shops'
import type { UUID } from '~/types/generics/uuidV4'
import type { Result } from '~/types/generics/result'

export const useShopStore = defineStore('shop', () => {
    const allShops = ref<Array<Shop>>(allShopsDefault)

    const currentShopIndex = ref(0)
    const currentShop = computed(() => {
        return allShops.value[currentShopIndex.value]
    })
    const nextShop = computed(() => {
        if (currentShopIndex.value + 1 < allShops.value.length) {
            currentShopIndex.value++
        }
    })
    const previousShop = computed(() => {
        if (currentShopIndex.value - 1 >= 0) {
            currentShopIndex.value--
        }
    })

    function getShopById(shopId: UUID): Result<Shop> {
        const shop = allShops.value.find((s) => s.id === shopId)
        if (shop === undefined) {
            return {
                success: false,
                error: [`Shop with id ${shopId} not found.`],
                source: [`getShopById: ${shopId}`],
            }
        }
        return { success: true, result: shop }
    }

    function addShop(
        name: string,
        location?: string, //TODO: add in GPS option
        currency?: currency,
    ): Shop {
        const shop = newShop()
        shop.name = name
        shop.location = location
        shop.currency = currency

        allShops.value.push(shop)
        return shop
    }

    function newShop(): Shop {
        return {
            id: uuid() as UUID,
            name: '',
            location: '',
            currency: undefined,
        }
    }

    function updateShop(shop: Shop): Result<Shop> {
        const id = shop.id
        const index = allShops.value.findIndex((s) => s.id === id)
        if (index < 0) {
            return {
                success: false,
                error: [`Shop with id ${id} not found for update.`],
                source: [`updateShop: ${id}`],
            }
        }
        if (index >= 0) {
            allShops.value[index] = shop
            return { success: true, result: shop }
        } else {
            return {
                success: false,
                error: [`Shop with id ${id} not found for update.`],
                source: [`updateShop: shop.id = ${id}`],
                result: shop,
            }
        }
    }

    /**
     *
     * @param id - shop's **global** uuidv4
     * @returns success state, and the deleted shop if successful. (for undo purposes)
     */
    function deleteShop(id: UUID): { success: boolean; shop?: Shop } {
        const index = allShops.value.findIndex((s) => s.id === id)
        if (index >= 0) {
            const shop = allShops.value[index]
            allShops.value.splice(index, 1)
            return { success: true, shop }
        } else {
            return { success: false }
        }
    }

    return {
        newShop, // Create blank (not added)
        addShop, // Create
        getShopById, // Read
        allShops, // Read
        currentShop, // Read
        currentShopIndex, // Read
        nextShop, // Read
        previousShop, // Read
        updateShop, // Update
        deleteShop, // Delete
    }
})
