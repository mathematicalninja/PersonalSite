import type { IntStore } from '~/types/component/stores'

/**
 *
 * @returns an identity function that uses the integer as it's own id.
 */
function intStore_Factory(): IntStore {
    function identity(DataId: number): number {
        return DataId
    }
    return identity
}
