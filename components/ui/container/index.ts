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
                // TODO: fix lightmode/darkmode default
                // These only show in the dark mode, but not the light mode.
                // 'bg-secondary',
                // 'dark:bg-secondary',
                // 'text-secondary-foreground',
                // 'dark:text-secondary-foreground',
            ],
            blend: [
                'w-full',
                'mx-auto ',
                'px-4',
                'sm:px-6 ',
                'lg:px-8',

                'bg-background',
                'text-background-foreground',

                'dark:bg-background',
                'dark:text-background-foreground',
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
