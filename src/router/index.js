import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FlowView from "@/views/FlowView.vue";
import FlowVizView from "@/views/FlowVizView.vue";
import FlowCardView from "@/views/FlowCardView.vue";
import DragSample from "@/views/DragSample.vue";

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
        },
        {
            path: '/flow_card',
            name: 'flow_card',
            component: FlowCardView,
        },
        {
            path: '/drag_sample',
            name: 'drag_sample',
            component: DragSample,
        }
    ]
})

export default router
