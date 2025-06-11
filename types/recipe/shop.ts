// --------------------------------------------------------
// Shop data
// --------------------------------------------------------

import type { UUID } from '../generics/uuidV4'
import type { currency } from './currency'

/**
 * @param id: shop's **global** uuidv4
 * @param id: UUID_ZERO for "null"/"unknown" shop.
 */
export type Shop = {
    id: UUID
    name: string
    location?: string
    currency?: currency
}
