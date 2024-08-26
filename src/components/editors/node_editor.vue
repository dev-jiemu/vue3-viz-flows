<template>
    <v-row>
        <v-col cols="8" class="text-h5 text-left mt-2 ml-2">
            <v-icon size="small" class="mr-2 mb-1">mdi-update</v-icon>
            EDIT SCENARIO
        </v-col>
        <v-col></v-col>
    </v-row>
    <v-divider class="ma-5"/>
    <v-card class="ma-3">
        <v-card-title>

        </v-card-title>
    </v-card>
</template>
<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";

const editorStore = useEditorStore()
const {scnInfo} = storeToRefs(editorStore)

const route = useRoute()
onMounted(() => {
    let nodeType = route.params.type
    let nodeSeqno = route.params.seqno

    if (nodeType !== "" && nodeSeqno !== "") {
        console.log('editor - onMounted : request scn_info')
        editorStore.getScnInfo({
            seqno: nodeSeqno,
            type: nodeType
        })
    }
})
</script>