<template>
  <v-container class="fill-height">
    <v-responsive v-if="store.currentData" class="d-flex align-center text-center fill-height align-stretch">
      <h1>Order Book</h1>
      <h2 class="mb-4">Current symbol: {{ store.currentSymbol }}</h2>
      <div class="glass d-flex flex-column align-center">
          <div class="glass__header d-flex flex-column">
            <div class="d-flex flex-row">
              <p class="glass__title">Bids</p>
              <p class="glass__title">Adds</p>
            </div>
            <div class="d-flex flex-row">
              <p class="glass__table-item">Quantity</p>
              <p class="glass__table-item">Price</p>
              <p v-if="!store.isMobile" class="glass__table-item">Total</p>
              <p class="glass__table-item">Quantity</p>
              <p class="glass__table-item">Price</p>
              <p v-if="!store.isMobile" class="glass__table-item">Total</p>
            </div>
          </div>        
          <div class="glass__table-container d-flex flex-row mb-4">            
            <TableComponent class="align-start" v-if="store.bids" style="glass__table-item" :data='store.bids'/>
            <TableComponent class="align-end" v-if="store.adds" style="glass__table-item" :data='store.adds'/>
          </div>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { SDK } from '@/plugins/SDK';
import { store } from '@/plugins/store';
import { onMounted } from 'vue';
import TableComponent from '@/components/TableComponent.vue';

onMounted(() => {
  const ws = SDK.subscribeBySymbol(store.currentSymbol);
  ws.onopen = (event) => {
    console.log('stream has been opened');
    SDK.getGlassData(store.currentSymbol).then(res => store.getLastUpdateId(res.lastUpdateId));
  }
  ws.onmessage = (event) => {
    if(event.data.u < store.lastUpdateId) return;
    const data = JSON.parse(event.data);
    if(data.U <= store.lastUpdateId + 1 && data.u >= store.lastUpdateId + 1) {
      store.getCurrentData(data);
      store.getAdds(data.a.filter(item => +item[1] !== 0).sort(sortMaxToMin));
      store.getBids(data.b.filter(item => +item[1] !== 0).sort(sortMaxToMin));
    }
    if((store.currentData.u + 1) === data.U) {
      store.getCurrentData(data);
      store.addEventInList({event: data.e, id: new Date})
      store.getAdds(data.a.filter(item => +item[1] !== 0).sort(sortMaxToMin));
      store.getBids(data.b.filter(item => +item[1] !== 0).sort(sortMaxToMin));
    }
  }
});

const sortMaxToMin = (a, b) => a[0] < b[0] ? 1 : -1;

</script>
<style scoped>
.glass {
  position: relative;
  max-height: 70vh;
  overflow: hidden;
  padding-right: 10px;
}
.glass__header {
  position: fixed;
  background: white;
  max-height: 50px;
}
.glass__table-container {
  margin-top: 50px;
}
.glass__title {
  width: 30vw;
  border: 1px solid black;
}
.glass:hover {
  overflow: auto;
  padding-right: 0;
}
.glass::-webkit-scrollbar {
  width: 10px;
}
.glass::-webkit-scrollbar-thumb{
    background: gray;
}
.glass__table-item{
  width: 10vw;
  border: 1px solid black;
}

@media screen and (max-width: 840px){
  .glass__title {
    width: 40vw;
  }
  .glass__table-item{
    width: 20vw;
  }
}

</style>
