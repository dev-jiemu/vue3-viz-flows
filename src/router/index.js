import {createRouter, createWebHistory} from 'vue-router'
import Main from '@/views/main.vue'
import DemoVueFlow from '@/components/demos/vue_flow.vue'
import EditorInformation from '@/components/editors/editor_information.vue'
import EditorFlow from '@/components/editors/editor_flow.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/editor'
        },
        {
            path: '/editor',
            name: 'editor_main',
            component: Main,
            children: [
                {
                    path: '',
                    name: 'editor_information',
                    component: EditorInformation,
                },
                {
                    path: ':seqno/:type',
                    name: 'editor_flow',
                    component: EditorFlow,
                }
            ]
        },
        {
            path: '/change',
            name: 'change'
        },
        {
            path: '/new',
            name: 'new',
        },
        {
            path: '/demo',
            name: 'demo',
            component: DemoVueFlow
        }
    ]
})

export default router
