<template>
    <div class="ma-3">
        <template v-for="item in stepsData">
            <node-props
                :item="item"
                :width="300"
                :style="`translate(${item.position.x}px, ${item.position.y}px)`"
                @update:position="updatePosition"
            ></node-props>
        </template>
    </div>
</template>
<script setup>
import NodeProps from '@/components/Node.vue'
import {onMounted} from "vue";
import {useStepStore} from "@/stores/step.js";
import {storeToRefs} from "pinia";

const stepStore = useStepStore()
const {stepsData} = storeToRefs(stepStore)

const sampleData = `
STEP:FIRST
[
    {
        "current_status": "INIT",
        "message": "로딩중입니다"
    },
    {
        "current_status": "SUCCESS",
        "next_step": "STEP1",
        "request_api": "/STEP2/new"
    },
    {
        "current_status": "FAIL",
        "next_step": "END"
    }
]

STEP:STEP1
[
    {
        "current_status": "LOADING",
        "message": "STEP1 로딩중"
    },
    {
        "current_status": "SUCCESS",
        "message": "STEP1 로딩완료",
        "next_step": "STEP2"
    },
    {
        "current_status": "FAIL",
        "message": "로딩실패",
        "next_step": "END"
    }
]
`

const updatePosition = (stepName, newPosition) => {
    const step = stepsData.value.find(s => s.stepName === stepName)
    if (step) {
        step.position = Object.assign(newPosition, {})
    }
}

function logMousePosition(event) {
    // event.clientX와 event.clientY는 클릭된 위치의 X, Y 좌표를 반환합니다.
    const positionX = event.clientX;
    const positionY = event.clientY;

    // 콘솔에 X, Y 좌표를 출력합니다.
    console.log(`Mouse Position: X=${positionX}, Y=${positionY}`);
}

// document의 클릭 이벤트에 logMousePosition 함수를 리스너로 추가합니다.
document.addEventListener('click', logMousePosition);

onMounted(() => {
    stepStore.extractSteps(sampleData)
})
</script>