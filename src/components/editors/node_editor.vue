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
        <v-card-text class="ma-1">
            <v-row>
                <v-col cols="6">
                    {{editScnInfo}}
                </v-col>
                <v-col cols="6" class="text-left">
                    <span class="text-h6">Preview</span>
                    <vue-json-pretty
                        style="background-color: aliceblue;"
                        class="mt-2 ml-2"
                        showLine
                        showIcon
                        :data="editScnInfo"
                    ></vue-json-pretty>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";

const editorStore = useEditorStore()
const {scnInfo} = storeToRefs(editorStore)

const editScnInfo = computed({
    get() {
        let result = {}

        result.type = scnInfo.value.type
        result.seqno = scnInfo.value.seqno

        if (scnInfo.value.hasOwnProperty("step_list")) {
            let stepList = []
            scnInfo.value.step_list.forEach(item => {
                let step = {}

                step.scn_seqno = item.scn_seqno
                step.step_id = item.step_id
                step.step_order = item.step_order

                let actions

                try {
                    actions = JSON.parse(item.event_actions)
                } catch (e) {
                    actions = item.event_actions
                }

                step.event_actions = actions

                stepList.push(step)
            })

            result.step_list = stepList
        }

        return result
    },
    set(newValue) {
        // editInfo 에만 반영
    }
})

const route = useRoute()


const updateInfo = () => {

}

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