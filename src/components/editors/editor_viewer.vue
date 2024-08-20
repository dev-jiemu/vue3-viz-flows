<template>
    <vue-flow
        :nodes="scnNodes"
        :edges="scnEdges"
        :class="{ dark }"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :fit-view-on-init="false"
        @connect="onConnect">

        <mini-map pannable zoomable/>
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
import {MiniMap} from "@vue-flow/minimap"
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue"

import NodeInit from "@/components/editors/custom_nodes/node_init.vue"
import NodeStep from "@/components/editors/custom_nodes/node_step.vue"
import NodeEnd from "@/components/editors/custom_nodes/node_end.vue"

import {useEditorStore} from "@/stores/editor.js"
import {storeToRefs} from "pinia"

const instance = useVueFlow()

const editorStore = useEditorStore()
const { scnNodes, scnEdges } = storeToRefs(editorStore)

const dark = true

const onConnect = (params) => {
    instance.addEdges(params)
}
</script>