<template>
    <vue-flow
        :nodes="nodes"
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

        <!-- custom nodes -->
        <template #node-init="props">
            <node-init v-bind="{...props}"/>
        </template>
        <template #node-step="props">
            <node-step v-bind="{...props}"/>
        </template>
        <template #node-end="props">
            <node-end v-bind="{...props}"/>
        </template>

    </vue-flow>
</template>
<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap";
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue";

import NodeInit from "@/components/editors/props/node_init.vue"
import NodeStep from "@/components/editors/props/node_step.vue"
import NodeEnd from "@/components/editors/props/node_end.vue"

import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const instance = useVueFlow()

const editorStore = useEditorStore()
const { scnInfo } = storeToRefs(editorStore)

const dark = true

// TODO
const onConnect = (params) => {
    // instance.addEdges(params)
}

// TODO : node update
const nodes = computed(() => {
    let result = []

    console.log(scnInfo.value)
    if (scnInfo.value.stepList !== undefined && scnInfo.value.stepList.length > 0) {
        scnInfo.value.stepList.forEach((item) => {
            let obj = editorStore.extractActions(item)
            console.log(obj)
            result.push(obj)
        })
    }

    console.log('nodes computed result : ', result)

    return result
})

// TODO
const edges = computed(() => {
    let result = []

    return result
})
</script>