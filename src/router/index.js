import {createRouter, createWebHistory} from 'vue-router'
import Main from '@/views/main.vue'
import DemoVueFlow from '@/components/demos/vue_flow.vue'
import EditorInformation from '@/components/editors/editor_information.vue'
import EditorViewer from '@/components/editors/editor_viewer.vue'
import DevDrawing from '@/components/dev/drawing.vue'

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
                    path: 'viewer/:seqno/:type',
                    name: 'editor_viewer',
                    component: EditorViewer,
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
        },
        {
            path: '/dev/drawing', // TODO: 컴포넌트 연습용 개발 페이지 - 나중에 제거요망
            name: 'dev',
            component: Main,
            children: [
                {
                    path: '',
                    name: 'drawing',
                    component: DevDrawing,
                }
            ]
        }
    ]
})

export default router
