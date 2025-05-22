import { cva, type VariantProps } from 'class-variance-authority'
export { default as Container } from './Container.vue'
export const containerVariants = cva('', {
    variants: {
        variant: {
            default: [
                'w-full',
                'mx-auto ',
                'px-4',
                'sm:px-6 ',
                'lg:px-8',
                'bg-blue-500',
            ],
        },
        border: {
            default: '',
            false: '',
        },
        padded: {
            default: '',
            true: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        border: 'default',
        padded: 'default',
    },
})

export type ContainerVariants = VariantProps<typeof containerVariants>
