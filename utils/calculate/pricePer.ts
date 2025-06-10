export function pricePer({
    price,
    quantity,
    goalAmount,
}: {
    price: number
    quantity: number
    goalAmount: number
}): number {
    if (
        price < 0 || //
        quantity <= 0 ||
        goalAmount < 0
    ) {
        return -1
    }

    return (goalAmount / quantity) * price
}
