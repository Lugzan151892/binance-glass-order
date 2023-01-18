<template>
    <div class="d-flex flex-column">
        <div v-for="item, index in data">
            <div :key="index" class="d-flex flex-row">
                <div class="table-item">
                {{ getRoundedNumber(item[0]) }}
                </div>
                <div class="table-item">
                {{ getRoundedNumber(item[1]) }}
                </div>
                <div v-if="!store.isMobile" class="table-item">
                {{ getRoundedNumber(item[0] * item[1]) }}
                </div>
            </div>
        </div> 
    </div>
</template>
<script setup>
import { store } from '@/plugins/store';
defineProps({
    data: Array,
    style: Object
});

const getRoundedNumber = (number) => Math.ceil((number)*100)/100;
</script>
<style scoped lang="css">
    .table-item {
        width: 10vw;
        border: 1px solid black;
    }
    
    @media screen and (max-width: 840px){
        .table-item{
            width: 20vw;
        }
    }
</style>
