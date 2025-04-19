<template> { at } </template>

<script lang="tsx" setup>
    import type { Atom } from '~/types/atom'
    import type { SortAtom } from '~/types/sorting'
    import type { JSX } from 'vue/jsx-runtime'

    const props = defineProps({
        atom: {
            type: Object as PropType<SortAtom<Atom<any>>>,
            required: true,
        },
        atomRenderFunction: {
            type: Function as PropType<(atom: SortAtom<any>) => JSX.Element>,
            required: false,
            default: (atom: SortAtom<any>) => {
                return <div>{atom.data}</div>
            },
        },
    })
    const at = props.atom.data.render()
</script>

<style></style>
