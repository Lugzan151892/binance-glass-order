<template>
  <v-app>
    <HeaderComponent/>  
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted } from 'vue';
import { store } from './plugins/store';

onMounted(() => {
  window.addEventListener('resize', () => {
    if(window.innerWidth < 840) store.isMobile = true;
    else store.isMobile = false;
  })
})
</script>
