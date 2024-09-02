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
                color="success"
                prepend-icon="mdi-plus"
            >NEW STEP</v-btn>
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
    <v-card v-if="editScnInfo.step_list !== undefined && editScnInfo.step_list.length > 0" class="ma-3" v-for="(info, info_idx) in editScnInfo.step_list">
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
                                @click="openActionPopup(info_idx, action_idx, action)"
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
    <v-card v-else>
        <v-card-text class="font-weight-bold">
            * step_list is empty *
        </v-card-text>
    </v-card>
    <v-dialog v-model="editModel" max-width="650">
        <popup-step-action-edit :item="editAction" @close="closeActionPopup" @update="updateEventAction"/>
    </v-dialog>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import editorApi from '@/api/editor.js'

import PopupStepActionEdit from '@/components/editors/props/popup_step_action_edit.vue'
import {onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";

const editorStore = useEditorStore()
const {scnInfo} = storeToRefs(editorStore)

// TODO: scn_seqno order by?
const editScnInfo = ref(scnInfo.value)

// step_list => event_actions
const editModel = ref(false)
const editAction = ref({
    info_idx: '',
    action_id: '',
    action: {}
})

const openActionPopup = (infoIdx, actionId, action) => {
    editAction.value.info_idx = infoIdx
    editAction.value.action_id = actionId
    editAction.value.action = Object.assign(action, {})

    editModel.value = true
}

const closeActionPopup = () => {
    editAction.value.info_idx = ''
    editAction.value.action_id = ''
    editAction.value.action = {}

    editModel.value = false
}

const route = useRoute()

const updateScnInfo = () => {
    if (confirm('update information?')) {
        let update_obj = JSON.parse(JSON.stringify(editScnInfo.value))

        update_obj.step_list.forEach((item) => {
            item.event_actions = JSON.stringify(item.event_actions)
        })

        let param = {
            node_detail: update_obj
        }

        editorApi.updateScnDetail(param, () => {
            alert('수정이 완료되었습니다')
            editorStore.getScnInfo({
                seqno: update_obj.seqno,
                type: update_obj.type
            })
        }, (err) => {
            alert("오류가 발생했습니다 : " + err)
        })
    }
}

const updateEventAction = (update) => {
    editScnInfo.value.step_list[update.info_idx].event_actions[update.action_id] = Object.assign(update.action, {})
    closeActionPopup()
}

onMounted(() => {
    let nodeType = route.params.type
    let nodeSeqno = route.params.seqno

    if (nodeType !== "" && nodeSeqno !== "") {
        console.log('editor - onMounted : request scn_info')
        editorStore.getScnInfo({
            seqno: route.params.seqno,
            type: route.params.type
        })
    }
})

watch(() => scnInfo.value, (newValue) => {
    editScnInfo.value = newValue
    window.scrollTo(0, 0) // 스크롤 최상단으로 올림
})
</script>