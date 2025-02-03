<script setup lang="ts">
import { PkmnDexImg } from '#components';
import { jobs } from 'googleapis/build/src/apis/jobs';
import ClickCard from '~/components/nlogn/clickCard.vue';
import { lazyData } from '~/composables/pkmn/getImageJson';
import {range} from '~/utils/manipulation/range';
import HeightWidthRatio from "~/utils/calculate/HeightWidthRatio";
import randomiseArray from '~/utils/array/randomise';

import pokenumber from "~/types/pokenumber";

const genCap = 9;
const pileCap = 2

const props = {
  dexNum: dexNum,
  genNum: 6,
  parent_height: 140,
  parent_width: 140,
};
const pileA = ref<pokeNumber[]>([
  {dexNum: 1, genNum: 1},
  {dexNum: 2, genNum: 1},
  {dexNum: 3, genNum: 1},  
])
const pileB = ref<pokeNumber[]>([
  {dexNum: 4, genNum: 1},
  {dexNum: 5, genNum: 1},
  {dexNum: 6, genNum: 1},  
])

const pileC = ref<pokeNumber[]>([
  {dexNum: 7, genNum: 1},
  {dexNum: 8, genNum: 1},
  {dexNum: 9, genNum: 1},  
])

const piles= computed(()=>{return[pileA, pileB, pileC]});

function choosePile(pile:any[],refPile:any):void {
  pile.reverse()
  const  h = pile.pop()
  pile.reverse()
  refPile.push(h)
  console.log(pile)
}
const ar = range(genCap)

const dexNums = ref<pokeNumber[]>([]);
const dNums = ref<NestedArray<pokeNumber>>([]);
// ar.map((x) => dNums.value.push({dexNum: x, genNum: 1}))

const v:NestedArray<pokeNumber> = []

const w = computed(()=>{return randomiseArray(ar)})
// BUG: this randomises the list twice, once on load, and twice on refresh

for (let x of w.value) {
  v.push({dexNum: x, genNum: 1})
}

const o = recursiveDistribute(v, pileCap)


// const k = randomiseArray(dNums.value)
// const v=recursiveDistribute(dNums.value, pileCap)
const t = ref([])


/*
Idea: create a generator function that takes in a NestedArray<T>, and at each "comparison step" it exposes "something" to wait for user input to be used as the comparison step.

The function should run recursivly (obviously), and companre the elements to T:
  - if the elements are a collection of Array<T>, then each of those elements can be thought of as a sorted list. 
  - otherwise the contents is a NestedArray<Array<T>>, ==> recusion.

When we have "dug down" to the second from bottom elements of the NestedArray<T> we should get an array of Array<T>
We then merge the elements of these arrays, starting with the first elements of each Array<T> being exposed to the user for comparison, and the "winner" being added to the return object as the first element.
Iterating until all element Array<T> are empty, then returning the sorted list (type Array<T>).
  - Note this will remove one layer of NestedArray<Array<T>> returning a NestedArray<T>.
  - if the recursive function is given a NestedArray<T> as input, it will return it unchanged (assuming it is an already sorted list.)
*/


</script>

<template>
<p> dexNums: {{ dexNums }}</p>
<p> ar: {{ ar }}</p>
<p> w: {{ w }}</p>
<p> v: {{ v }}</p>
<p> o: {{ o }}</p>
<p> t: {{ t }}</p>
  <UContainer 
    class="flex border-green-500 border-2 align-center justify-center h-96  bg-black "
    style="padding: 0%;"
    width="500"
  >
  <div
    class=""
  >
    <div
    class="flex justify-center"
    >
      <ClickCard
        v-for="pile in piles"
        :onClick="() => choosePile(pile.value, dexNums) "
      >
        <PkmnDexImg 
        v-if="pile.value.length > 0"
          :dex-num="pile.value[0].dexNum" 
          :gen-num="1" 
          :parent_height="140"
        :parent_width="140"
        />
      </ClickCard>
    </div>
    
    <div
    class="flex justify-center">
      
      <PkmnDexImg  
      v-for="pkmn in dexNums"
          :dex-num="pkmn.dexNum" 
          :gen-num="pkmn.genNum" 
          :parent_height="140"
        :parent_width="140"
        />
    </div>
  </div>
  </UContainer>
</template>

<style scoped></style>
