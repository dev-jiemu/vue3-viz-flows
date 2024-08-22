<template>
    <vue-flow
        :key="flowKey"
        :nodes="scnNodes"
        :edges="scnEdges"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        @connect="onConnect"
    >

        <mini-map pannable zoomable/>
        <controls/>
        <dropzone-background/>

        <!-- custom nodes -->
        <template #node-init="props">
            <node-init v-bind="{...props}" @open-detail="openPopup"/>
        </template>
        <template #node-step="props">
            <node-step v-bind="{...props}" @open-detail="openPopup"/>
        </template>
        <template #node-end="props">
            <node-end v-bind="{...props}"/>
        </template>

    </vue-flow>
    <v-dialog v-model="detailModel" max-width="600">
        <popup-step-action-info :item="detailItem" @close="closePopup"/>
    </v-dialog>
</template>
<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap"
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue"
import NodeInit from "@/components/editors/custom_nodes/node_init.vue"
import NodeStep from "@/components/editors/custom_nodes/node_step.vue"
import NodeEnd from "@/components/editors/custom_nodes/node_end.vue"
import PopupStepActionInfo from '@/components/editors/props/popup_step_action_info.vue'

import {useEditorStore} from "@/stores/editor.js"
import {storeToRefs} from "pinia"
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";

const instance = useVueFlow()
const route = useRoute()

const flowKey = ref(0)

const editorStore = useEditorStore()
const { scnNodes, scnEdges } = storeToRefs(editorStore)

const onConnect = (params) => {
    console.log('onConnect params : ', params)
    instance.addEdges(params)
}

const detailModel = ref(false)
const detailItem = ref({})

const openPopup = (item) => {
    detailItem.value = item
    detailModel.value = true
}

const closePopup = () => {
    detailItem.value = {}
    detailModel.value = false
}

onMounted(() => {
    let nodeType = route.params.type
    let nodeSeqno = route.params.seqno

    // type, seqno 가 있는데 node length 가 0임 == 화면 새로고침 된 경우
    if ((nodeType && nodeSeqno) && scnNodes.value.length === 0) {
        console.log('editor_viewer - onMounted : request scn_info')
        editorStore.getScnInfo({
            seqno: nodeSeqno,
            type: nodeType
        })
    }
})

watch(scnEdges, () => {
    flowKey.value += 1
})
</script>