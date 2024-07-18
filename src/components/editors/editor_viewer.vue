<template>
    <!--        :edges="edges"-->
    <!--        @connect="onConnect" -->
    <vue-flow
        :props="viewerInfo"
        :class="{ dark }"
        class="basic-flow"
        :default-viewport="{ zoom: 1.5 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :fit-view-on-init="true">

        <mini-map/>
        <controls/>
        <dropzone-background/>

        <!-- TODO: custom node -->
        <template #node-init="props">
            <node-init v-bind="{...props}"/>
        </template>

    </vue-flow>
</template>
<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap";
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue";
import NodeInit from "@/components/editors/props/node_init.vue"

import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";
import {computed} from "vue";
import {useRoute} from "vue-router";

const {addEdges} = useVueFlow()

const editorStore = useEditorStore()
const { scnInfo } = storeToRefs(editorStore)

const dark = true
//
// const onConnect = (params) => {
//     addEdges(params)
// }

const viewerInfo = computed(() => {
    let result = []

    if(scnInfo.value.stepList && scnInfo.value.stepList.length > 0) {
        scnInfo.value.stepList.forEach((item) => {
            console.log('extract: ', editorStore.extractActions(item))
        })
    }

    return result
})
</script>