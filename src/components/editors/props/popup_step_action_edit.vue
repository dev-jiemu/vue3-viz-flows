<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="8">
                    <span class="">UPDATE</span>
                </v-col>
                <v-col cols="4" class="text-right">
                    <v-btn variant="text" icon="mdi-close" density="comfortable" @click="closePopup"/>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text class="ma-1">
            <template v-for="(value, key) in editAction.action">
                <div v-if="typeof value === 'object'">
                    <v-card class="pa-2">
                        <v-row>
                            <v-col cols="4" class="font-weight-bold text-right">
                                {{ key }}
                            </v-col>
                            <v-col cols="8" class="text-left text-caption" style="color: #1976D2;">
                                <span class="font-weight-bold">
                                    <v-icon class="mt-1 mb-2" size="small">mdi-information-outline</v-icon> 데이터를 클릭
                                </span>하면 편집이 가능합니다.
                            </v-col>
                        </v-row>
                        <!-- TODO: json-editor -->
                        <vue-json-pretty
                            :data="editAction.action[key]"
                            editable
                        ></vue-json-pretty>
                    </v-card>
                </div>
                <div v-else>
                    <v-row>
                        <v-col cols="4" class="font-weight-bold text-right mt-2">{{ key }}</v-col>
                        <v-col cols="8" class="text-left">
                            <v-text-field
                                v-model="editAction.action[key]"
                                density="compact"
                                variant="underlined">
                            </v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </v-card-text>
        <v-divider class="ml-5 mr-5 mb-2"/>
        <v-card-text>
            <v-row>
                <v-col cols="6" class="text-left">
                    <v-btn color="gray" variant="outlined" @click="closePopup">CLOSE</v-btn>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn color="success" variant="outlined" @click="updateAction">OK</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import {onMounted, ref} from "vue";

const props = defineProps(['item'])
const emits = defineEmits(['close', 'update'])

const editAction = ref(props.item)

const closePopup = () => {
    emits('close')
}

const updateAction = () => {
    if (confirm('update?')) {
        emits('update', editAction.value)
    }
}

onMounted(() => {
    console.log(`openActionPopup : ${props.item.order_id}, ${props.item.action_id}, [${JSON.stringify(props.item.action)}]`)
})

</script>