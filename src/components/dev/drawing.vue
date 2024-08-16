<template>
    <vue-flow
        :nodes="sampleNodes"
        :class="{ dark }"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :fit-view-on-init="true"
    >
        <mini-map/>
        <controls/>
        <dropzone-background/>

        <template #node-step="props">
            <step-node v-bind="{...props}"/>
        </template>
    </vue-flow>
</template>
<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {onMounted, ref} from "vue";
import {MiniMap} from "@vue-flow/minimap";
import DropzoneBackground from "@/components/common/dropzone_background.vue";
import {Controls} from "@vue-flow/controls";
import stepNode from '@/components/dev/step_node.vue'

const dark = true

// TODO: 데이터 제외하고 push
const sampleNodes = ref([
    {
        "type": "step",
        "data": {
            "step_id": "SEND",
            "step_action": [
            ]
        },
        "id": "SEND",
        "position": {x: 40, y: 5}, // sample
    }
])

/*
    [handle:target] STEP_ID
    --------------------------------
     action_type : condition_status
    [-------------------------------] [handle:source]
    else

    ** 다른 서버의 job은 비동기로 돌아가는데 이건 어떻게 표기할지 고민이 필요함

    target, source handler 명명규칙 정의
    - target: current_step_id
    - source: current_step_id + index + next_step_id

    이렇게 하면 source N : target 1 형태의 edge 를 그릴 수 있음
 */
</script>