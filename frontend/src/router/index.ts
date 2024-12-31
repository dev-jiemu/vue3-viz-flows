import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Main from '@/views/main.vue';

// 라우트 정의
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/components/demos/vue_flow.vue'),
  },
  {
    path: '/dev', // TODO: 컴포넌트 연습용 개발 페이지 - 나중에 제거요망
    name: 'dev',
    component: Main,
  },
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
