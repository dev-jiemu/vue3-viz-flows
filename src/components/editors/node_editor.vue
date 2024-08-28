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
    <v-divider class="mt-5 mb-5"/>
    <v-card class="ma-3" v-for="info in editScnInfo.step_list">
        <v-card-text class="ma-1">
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="8" class="text-left">
                            <span class="text-h6 mb-2">
                                <v-chip
                                    class="ml-3 mr-1 mb-1 font-weight-bold"
                                    label
                                    color="purple"
                                >{{ info.step_order }}
                                </v-chip>
                                {{ info.step_id }}
                            </span>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn class="mt-2 mr-3" icon="mdi-plus" variant="text" density="compact"
                                   color="success"></v-btn>
                        </v-col>
                    </v-row>
                    <template v-for="(action, action_idx) in info.event_actions">
                        <v-card class="ma-3 position-relative" variant="outlined">
                            <v-btn
                                class="position-absolute top-0 right-0"
                                style="transform: translate(-30%, 30%);"
                                variant="text"
                                density="compact"
                                icon="mdi-pencil"
                                @click="openActionPopup(info.step_order, action_idx, action)"
                            ></v-btn>
                            <v-card-text>
                                <template v-for="(value, key) in action">
                                    <v-row>
                                        <v-col cols="4" class="text-right font-weight-bold">{{ key }}</v-col>
                                        <v-col cols="7" class="text-left">{{ value }}</v-col>
                                    </v-row>
                                </template>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-col>
                <v-col cols="6" class="text-left">
                    <span class="text-h6">+ Preview</span>
                    <vue-json-pretty
                        :data="info"
                        style="background-color: aliceblue; padding: 10px;"
                        class="ma-2"
                        showLine
                        showIcon
                    ></vue-json-pretty>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
    <v-dialog v-model="editModel" max-width="650">
        <popup-step-action-edit :item="editAction" @close="closeActionPopup" @update="updateScnInfo"/>
    </v-dialog>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import PopupStepActionEdit from '@/components/editors/props/popup_step_action_edit.vue'
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

// step_list => event_actions
const editModel = ref(false)
const editAction = ref({
    order_id: '',
    action_id: '',
    action: {}
})

const openActionPopup = (orderId, actionId, action) => {
    editAction.value.order_id = orderId
    editAction.value.action_id = actionId
    editAction.value.action = Object.assign(action, {})

    editModel.value = true
}

const closeActionPopup = () => {
    editModel.value = false
}

const route = useRoute()

// TODO: json object to string
const updateScnInfo = (update) => {
    alert(`updateScnInfo : ${JSON.stringify(update)}`)
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