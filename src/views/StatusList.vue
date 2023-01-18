<template>
    <v-container class="fill-height">
        <v-select
            v-model="store.currentSymbol"
            :hint="`${store.currentSymbol}`"
            :items="store.symbolsList"
            label="Select"
            persistent-hint
            return-object
            single-line
        ></v-select>
        <h2 class="mt-10 mb-5">Event List</h2>
        <div class="list">
            <ul class="fill-width" v-for="item in store.listOfEvents">
                <li class="list__item mb-5" :key="item.id">
                    <p class="mb-1 ml-2">Событие: {{ item.event }}</p>
                    <p class="ml-2">{{ item.id }}</p>
                </li>
            </ul>
        </div>
        
    </v-container>
</template>
<script setup>
import { store } from '@/plugins/store';

</script>
<style>
    .list {
        max-height: 70vh;
        overflow: auto;
    }
    .list__item {
        border: 1px solid black;
    }
</style>
