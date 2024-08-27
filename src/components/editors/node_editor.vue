<template>
    <v-row>
        <v-col cols="8" class="text-h5 text-left">
            <v-icon size="x-small" class="mr-1 mb-1">mdi-file-edit-outline</v-icon>
            EDIT SCENARIO
            <v-chip class="ml-2" variant="outlined" density="compact" color="success">{{ editScnInfo.type }}</v-chip>
            :
            <v-chip variant="outlined" density="compact" color="blue">{{ editScnInfo.seqno }}</v-chip>
        </v-col>
        <v-col class="text-right">
            <v-btn
                class="mr-3"
                variant="outlined"
                color="orange"
                prepend-icon="mdi-update"
                @click="updateScnInfo"
            >
                UPDATE
            </v-btn>
        </v-col>
    </v-row>
    <v-divider class="ma-5"/>
    <v-card class="ma-3" v-for="info in editScnInfo.step_list">
        <v-card-text class="ma-1">
            <v-row>
                <v-col cols="6">
                    <div class="text-h6 text-left mb-2">
                        <v-chip
                            class="mr-1 mb-1"
                            label
                            color="purple"
                        >{{ info.step_order }}
                        </v-chip>
                        {{ info.step_id }}
                    </div>
                    <template v-for="action in info.event_actions">
                        <v-card class="ma-3 position-relative" variant="outlined">
                            <v-btn
                                class="position-absolute top-0 right-0"
                                style="transform: translate(-30%, 30%);"
                                variant="text"
                                density="compact"
                                icon="mdi-pencil"></v-btn>
                            <v-card-text>
                                <template v-for="(value, key) in action">
                                    <v-row>
                                        <v-col cols="4" class="text-right">{{ key }}</v-col>
                                        <v-col class="text-left">{{ value }}</v-col>
                                    </v-row>
                                </template>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-col>
                <v-col cols="6" class="text-left">
                    <span class="text-h6">Preview</span>
                    <vue-json-pretty
                        :data="info"
                        style="background-color: aliceblue;"
                        class="ma-2"
                        showLine
                        showIcon
                    ></vue-json-pretty>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <v-dialog v-model="editModel" max-width="600">
        <!-- TODO: -->
    </v-dialog>
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
    }
})

const editModel = ref(false)

const route = useRoute()

// TODO: json object to string
const updateScnInfo = () => {
    if (confirm('update?')) {

    }
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