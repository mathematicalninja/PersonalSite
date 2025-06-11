<script setup lang="tsx">
    import { cn } from '~/components/ui/lib/utils'

    const components: {
        [key: string]: { title: string; href: string; description: string }[]
    } = {
        test: [
            {
                title: 'test',
                href: '/test',
                description: 'test',
            },
        ],
        cv: [
            {
                title: 'cv',
                href: '/cv',
                description: 'cv',
            },
        ],
        'About me': [
            {
                title: 'Introduction',
                href: '/content/about.md',
                description: 'Introduction',
            },
            {
                title: 'Coding',
                href: '/content/coding.md',
                description: 'Coding',
            },

            { title: 'Maths', href: '/content/maths.md', description: 'Maths' },
            {
                title: 'Teaching',
                href: '/content/teaching.md',
                description: 'Teaching',
            },
            {
                title: 'Disability',
                href: '/content/disability.md',
                description: 'Disability',
            },
        ],
        'Sorting Algo': [
            { title: 'demo', href: '/nlogn/demo', description: '' },
            {
                title: 'Atom Sort',
                href: '/nlogn/pkmn/testAtoms',
                description: '',
            },
            {
                title: 'Pile Sort',
                href: '/nlogn/pkmn/testPiles',
                description: '',
            },
            {
                title: 'Mix Sort',
                href: '/nlogn/pkmn/testMix',
                description: '',
            },
            {
                title: 'Recursive Sort',
                href: '/nlogn/pkmn/testRecursive',
                description: '',
            },
        ],
        Pokemon: [
            { title: 'Gen 1', href: '/nLogn/pkmn/gen1', description: '' },
        ],
        Demos: [
            {
                title: 'Colour Pallet',
                href: '/demos/colourPalette',
                description: '',
            },
            {
                title: 'Recipe Cost Calculator',
                href: '/demos/recipeCoster',
                description: '',
            },
            {
                title: 'Add a shop',
                href: '/demos/shopAdder',
                description: 'GUI to add shops to the database',
            },
            {
                title: 'Add an ingredient',
                href: '/demos/ingredientAdder',
                description: 'GUI to add ingredients to the database',
            },
            {
                title: 'Add a recipe',
                href: '/demos/recipeAdder',
                description: 'GUI to add recipes to the database',
            },
            // {
            //     title: 'Clocks',
            //     href: '/demos/clocks',
            //     description: '',
            // },
            {
                title: 'Price Compare',
                href: '/demos/priceCompare',
                description: 'Compare the unit price of two items',
            },
        ],
    }

    const dropDownClass = cn([
        'bg-secondary',
        'grid',
        'w-[400px]',
        'gap-3',
        'p-4',
        'md:w-[500px]',
        'md:grid-cols-2',
        'lg:w-[600px]',
    ])
    const dropdownItemClass = cn([
        // 'bg-accent',
        'block',
        'select-none',
        'space-y-1',
        'rounded-md',
        'p-3',
        'leading-none',
        'no-underline',
        'outline-none',
        'transition-colors',
        'hover:bg-accent/75',
        'hover:text-accent-foreground',
        'focus:bg-accent/75',
        'focus:text-accent-foreground',
    ])
    const dropdownTitleClass = cn([
        'text-sm', //
        'font-medium',
        'leading-none',
    ])
    const dropdownDescriptionClass = cn([
        'line-clamp-2', //
        'text-sm',
        'leading-snug',
        'text-muted-foreground',
    ])
    const mainItemClass = cn([
        'bg-secondary', //
        'text-secondary-foreground', //
    ])
</script>

<template>
    <QNavigationMenu>
        <QNavigationMenuList>
            <QNavigationMenuItem
                v-for="(groupName, index) in Object.keys(components)"
            >
                <QNavigationMenuTrigger :class="mainItemClass">{{
                    groupName
                }}</QNavigationMenuTrigger>
                <QNavigationMenuContent>
                    <ul :class="dropDownClass">
                        <li
                            v-for="component in components[groupName]"
                            :key="component.title"
                        >
                            <QNavigationMenuLink as-child>
                                <a
                                    :href="component.href"
                                    :class="dropdownItemClass"
                                >
                                    <div :class="dropdownTitleClass">{{
                                        component.title
                                    }}</div>
                                    <p :class="dropdownDescriptionClass">
                                        {{ component.description }}
                                    </p>
                                </a>
                            </QNavigationMenuLink>
                        </li>
                    </ul>
                </QNavigationMenuContent>
            </QNavigationMenuItem>
            <QSwitchDarkMode />
        </QNavigationMenuList>
    </QNavigationMenu>
</template>

<style scoped></style>
