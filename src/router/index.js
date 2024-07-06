import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FlowView from "@/views/FlowView.vue";
import FlowVizView from "@/views/FlowVizView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/flow',
            name: 'flow',
            component: FlowView,
        },
        {
            path: '/flow_viz',
            name: 'flow_viz',
            component: FlowVizView,
        }
    ]
})

export default router
