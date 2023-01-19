import OrderBook from '@/views/OrderBook.vue';
import StatusList from '@/views/StatusList.vue';
import { createRouter, createWebHashHistory} from 'vue-router';

const routes = [
    { path: '/', component: OrderBook },
    { path: '/main', component: StatusList },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
