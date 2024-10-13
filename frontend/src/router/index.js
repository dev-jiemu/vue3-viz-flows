import {createRouter, createWebHistory} from 'vue-router'
import Main from '@/views/main.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
        },
        {
            path: '/demo',
            name: 'demo',
            component: () => import('@/components/demos/vue_flow.vue')
        },
        {
            path: '/dev', // TODO: 컴포넌트 연습용 개발 페이지 - 나중에 제거요망
            name: 'dev',
            component: Main,
        }
    ]
})

export default router
