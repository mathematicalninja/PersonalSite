<script setup lang="ts">
    // import { Link, NuxtLink } from "#build/components";

    // const horOne = new Link();
    // horOne.useLink({ to: "/cv" });

    const navItems: Array<{ path: string; name: string }> = [
        { name: 'test', path: '/test' },
        { name: 'cv', path: '/cv' },
        { name: 'gen1', path: '/nlogn/pkmn/gen1' },
        { name: 'demo', path: '/nlogn/demo' },
        { name: 'testAtoms', path: '/nlogn/pkmn/testAtoms' },
        { name: 'testPiles', path: '/nlogn/pkmn/testPiles' },
        { name: 'testMix', path: '/nlogn/pkmn/testMix' },
        { name: 'testRecursive', path: '/nlogn/pkmn/testRecursive' },
    ]
</script>

<template>
    <!-- <div>Component: Header/Navigation</div> -->
    <div class="pd-2 flex flex-row justify-center items-center gap-2">
        <UButton
            v-for="navItem in navItems"
            :key="navItem.name"
        >
            <NuxtLink :to="navItem.path">
                {{ navItem.name }}
            </NuxtLink>
        </UButton>
    </div>
</template>

<style scoped></style>
