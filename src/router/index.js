import {createRouter, createWebHistory} from 'vue-router'
import Viewer from '@/views/viewer.vue'
import Editor from '@/views/editor.vue'
import DemoVueFlow from '@/components/demos/vue_flow.vue'
import NodeInformation from '@/components/viewers/node_information.vue'
import NodeViewer from '@/components/viewers/node_viewer.vue'
import NodeEditor from '@/components/editors/node_editor.vue'
import EditorInformation from '@/components/editors/editor_information.vue'
import NewScenario from '@/components/editors/new_scenario.vue'
import DevDrawing from '@/components/dev/drawing.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/viewer',
        },
        {
            path: '/viewer',
            name: 'viewer_main',
            component: Viewer,
            children: [
                {
                    path: '',
                    name: 'node_information',
                    component: NodeInformation,
                },
                {
                    path: ':seqno/:type',
                    name: 'node_viewer',
                    component: NodeViewer,
                }
            ]
        },
        {
            path: '/editor',
            name: 'editor',
            component: Editor,
            children: [
                {
                    path: '',
                    name: 'editor_information',
                    component: EditorInformation,
                },
                {
                    path: ':seqno/:type',
                    name: 'node_editor',
                    component: NodeEditor,
                },
                {
                    path: 'new',
                    name: 'new_scenario',
                    component: NewScenario,
                }
            ]
        },
        {
            path: '/demo',
            name: 'demo',
            component: DemoVueFlow
        },
        {
            path: '/dev/drawing', // TODO: 컴포넌트 연습용 개발 페이지 - 나중에 제거요망
            name: 'dev',
            component: Viewer,
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
