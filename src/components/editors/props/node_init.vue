<template>
    <div class="node-wrapper">
        <div style="width: 300px;" class="pa-2">
            <div class="text-h6">
                <v-row>
                    <v-col cols="1" class="text-center mr-1">
                        <v-icon icon="mdi-ray-start" size="x-small"/>
                    </v-col>
                    <v-col class="text-left ml-1">{{ props.data.step_id }}</v-col>
                </v-row>
            </div>
        </div>
        <v-divider/>
        <div class="ma-1">
            <template v-for="(item, idx) in props.data.step_action">
                <div class="pa-2">
                    <v-row>
                        <v-col cols="9" class="text-left mt-2">
                            <v-chip color="success" variant="outlined" size="small">{{ item.event_type }}</v-chip>
                            <span v-if="item.cond_code !== null && item.cond_code !== undefined">
                    : <v-chip color="gray" size="small">{{ item.cond_code }}</v-chip>
                </span>
                        </v-col>
                        <v-col cols="1" class="text-center mt-2">
                            <v-icon icon="mdi-details" size="small" color="blue"></v-icon>
                        </v-col>
                        <v-col class="text-center mt-2 mr-1"
                               v-if="item.next_step_id !== undefined && item.next_step_id !== null">
                            <Handle
                                :id="'source-' + idx" type="source"
                                :position="Position.Right"
                                :style="sourcePosition[idx]"
                                class="handle-source mb-4">
                            </Handle>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>

import {Handle, Position} from "@vue-flow/core";
import {computed} from "vue";

const props = defineProps({
    id: String,
    type: String,
    data: Object,
    position: Object,
})

// TODO: 간격 재정의 필요
const sourcePosition = computed(() => {
    const length = props.data.step_action.length

    const spacing = (40 * length) / (length - 1)
    console.log('spacing : ', spacing)

    const positions = []
    for (let i = 0; i < length; i++) {
        positions.push({bottom: `${spacing * i}px`, top: 'auto'})
    }

    return positions
})

</script>
<style scoped>
.node-wrapper {
    position: relative;
}

.handle-source {
    width: 20px !important;
    height: 20px !important;
    background-color: lightblue !important;
    border: 3px solid green !important;
    border-radius: 50%;
}
</style>