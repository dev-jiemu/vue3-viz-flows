<template>
    <vue-flow
        :nodes="stepsData"
        :edges="edges"
        :class="{ dark }"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4">
        <mini-map/>
        <controls/>
        <dropzone-background/>

        <!-- custom init -->
        <template #node-first="{ firstProps }">
            <init v-bind="firstProps"/>
        </template>
        <template #node-step="{ stepProps }">
            <step v-bind="stepProps"/>
        </template>
    </vue-flow>
</template>
<script setup>
import {onMounted, ref} from 'vue'
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap";
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/DropzoneBackground.vue";
import Init from "@/components/nodes/Init.vue"
import Step from "@/components/nodes/Step.vue"
import {useServiceStore} from "@/stores/Service.js";
import {storeToRefs} from "pinia";

const {onConnect, addEdges} = useVueFlow()

const serviceStore = useServiceStore()
const {stepsData} = storeToRefs(serviceStore)

onConnect((connection) => {
    addEdges(connection)
})

const dark = true

const edges = ref([])

onMounted(() => {
    serviceStore.extractSteps()
    console.log(stepsData.value)
})
</script>
