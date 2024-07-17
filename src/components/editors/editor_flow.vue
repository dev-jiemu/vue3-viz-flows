<template>
    <!--        :props="stepsData"-->
    <!--        :edges="edges"-->
    <vue-flow
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

        <!-- TODO: custom node -->

    </vue-flow>
</template>
<script setup>
import {useVueFlow, VueFlow} from '@vue-flow/core'
import {MiniMap} from "@vue-flow/minimap";
import {Controls} from '@vue-flow/controls'

import DropzoneBackground from "@/components/common/dropzone_background.vue";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const {addEdges} = useVueFlow()

const editorStore = useEditorStore()
const { scnInfo } = storeToRefs(editorStore)

const dark = true

const onConnect = (params) => {
    addEdges(params)
}

onMounted(() => {
    // TODO: param value get -> call api
})

// TODO: edge watch
</script>