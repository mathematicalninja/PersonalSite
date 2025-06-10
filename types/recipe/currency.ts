export type currency =
    | 'GBP' //
    | 'BND'
    | 'USD'

export function currencyLookup(currency: currency): string {
    switch (currency) {
        case 'GBP':
            return '£'
        case 'BND':
            return '$'
        case 'USD':
            return '$'
        default:
            return '£'
    }
}

export const allCurrencies: Array<currency> = [
    'GBP', //
    'BND',
    'USD',
]
