import { defineStore } from 'pinia'
import { isInt } from '~/utils/calculate/isInt'

const initial = 37
export const useCollatzStore = defineStore('counter', {
    state: () => ({
        start: initial,
        current: initial,
        path: [initial] as number[],
        steps: 0,
    }),
    getters: {
        isEven(state): boolean {
            return state.current % 2 === 0
        },

        isFinished(state): boolean {
            const containsOne = state.path.includes(1)
            return containsOne
        },

        next(): number {
            if (this.isEven) {
                // even
                return this.current / 2
            } else {
                // odd
                return (3 * this.current + 1) / 2
            }
        },
        previous(): number | null {
            if (this.path.length > 1) {
                return this.path[this.path.length - 2]
            } else return null
        },

        timeToOne(): number | null {
            if (this.isFinished) {
                return this.path.indexOf(1)
            }
            return null
        },
    },
    actions: {
        advance(terminate: boolean): string | void {
            // // If only terminal sequences are needed, then the following can be used.
            if (this.isFinished && terminate) {
                return `Collatz sequence completed in ${this.timeToOne} steps.`
            }
            this.current = this.next
            this.path.push(this.current)
            this.steps++
        },

        restart(n: number): string {
            if (!isInt(n) || n <= 0) {
                return 'Invalid input, please enter a positive integer.'
            }
            this.start = n
            this.current = n
            this.path = [n]
            this.steps = 0
            return `Collatz sequence started with ${n}.`
        },
    },
})
