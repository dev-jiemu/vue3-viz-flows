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
        @connect="onConnect">

        <mini-map/>
        <controls/>
        <dropzone-background/>

        <!-- custom props -->
        <template #node-first="props">
            <init-node v-bind="{...props}"/>
        </template>
        <template #node-step="props">
            <step-node v-bind="{...props}"/>
        </template>
        <template #node-end="props">
            <end-node v-bind="{...props}"/>
        </template>

    </vue-flow>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap";
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue";
import InitNode from "@/components/demos/nodes/init.vue"
import StepNode from "@/components/demos/nodes/step.vue"
import EndNode from "@/components/demos/nodes/end.vue"
import {useServiceStore} from "@/stores/demos/service.js";
import {storeToRefs} from "pinia";

const {addEdges} = useVueFlow()

const serviceStore = useServiceStore()
const {stepsData} = storeToRefs(serviceStore)

const onConnect = (params) => {
    addEdges(params)
}

const dark = true

const edges = ref([]) // TODO

onMounted(() => {
    serviceStore.extractSteps()
    console.log(stepsData.value)
})

watch(stepsData, (newData) => {
    if (stepsData.value.length >= 2) { // TODO
        edges.value = []
        edges.value.push({id: 'e1-2', source: '1', target: '2', type: 'smoothstep', animated: true, style: { stroke: 'white', strokeWidth: 3 }})
        edges.value.push({id: 'e2-3', source: '2', target: '3', type: 'smoothstep', animated: true, style: { stroke: 'white', strokeWidth: 3 }})
        edges.value.push({id: 'e1-4', source: '1', target: '4', type: 'default', animated: false, style: { stroke: 'red' }})
        edges.value.push({id: 'e2-4', source: '2', target: '4', type: 'default', animated: false, style: { stroke: 'red' }})
        edges.value.push({id: 'e3-4', source: '3', target: '4', type: 'smoothstep', animated: true, style: { stroke: 'white', strokeWidth: 3 }})
    }
},  { immediate: true })
</script>
