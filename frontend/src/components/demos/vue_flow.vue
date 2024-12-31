<template>
  <vue-flow
    :nodes="stepsData"
    :edges="edges"
    :class="{ dark }"
    class="basic-flow"
    :default-viewport="{ zoom: 1.5 }"
    :min-zoom="0.2"
    :max-zoom="4"
    :fit-view-on-init="true"
    @connect="onConnect"
  >
    <mini-map />
    <controls />
    <dropzone-background />

    <!-- 커스텀 노드 렌더링 -->
    <template #node-first="props">
      <init-node v-bind="{ ...props }" />
    </template>
    <template #node-step="props">
      <step-node v-bind="{ ...props }" />
    </template>
    <template #node-end="props">
      <end-node v-bind="{ ...props }" />
    </template>
  </vue-flow>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref, watch } from 'vue';
import { useVueFlow } from '@vue-flow/core';
import { type Connection } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { Controls } from '@vue-flow/controls';

import DropzoneBackground from '@/components/common/dropzone_background.vue';
import InitNode from '@/components/demos/nodes/init.vue';
import StepNode from '@/components/demos/nodes/step.vue';
import EndNode from '@/components/demos/nodes/end.vue';
import { useServiceStore } from '@/stores/demos/service';
import { storeToRefs } from 'pinia';

// Edge 타입 정의
interface Edge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep' | 'default';
  animated: boolean;
  style: {
    stroke: string;
    strokeWidth?: number;
  };
}

// Node 타입 정의 (추가)
interface Node {
  id: string;
  type: 'first' | 'step' | 'end';
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

// VueFlow 사용
const { addEdges } = useVueFlow();

// Pinia 스토어에서 데이터 가져오기
const serviceStore = useServiceStore();
const { stepsData } = storeToRefs(serviceStore);

// 연결 이벤트 핸들러
const onConnect = (params: Connection): void => {
  addEdges(params);
};

const dark = true;

// edges 상태 정의
const edges: Ref<Edge[]> = ref([]);

// 컴포넌트 초기화
onMounted(() => {
  serviceStore.extractSteps();
  console.log(stepsData.value);
});

// stepsData 변경 감지
watch(
  stepsData,
  (newData) => {
    if (stepsData.value.length >= 2) {
      edges.value = [
        {
          id: 'e1-2',
          source: '1',
          target: '2',
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'white', strokeWidth: 3 },
        },
        {
          id: 'e2-3',
          source: '2',
          target: '3',
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'white', strokeWidth: 3 },
        },
        {
          id: 'e1-4',
          source: '1',
          target: '4',
          type: 'default',
          animated: false,
          style: { stroke: 'red' },
        },
        {
          id: 'e2-4',
          source: '2',
          target: '4',
          type: 'default',
          animated: false,
          style: { stroke: 'red' },
        },
        {
          id: 'e3-4',
          source: '3',
          target: '4',
          type: 'smoothstep',
          animated: true,
          style: { stroke: 'white', strokeWidth: 3 },
        },
      ];
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.basic-flow {
  height: 100%;
  width: 100%;
}
</style>
