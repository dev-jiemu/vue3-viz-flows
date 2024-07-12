<template>
    <div class="node-wrapper">
        <v-card class="bg-blue-grey-darken-3" width="300">
            <v-card-title>
                {{ props.data.stepName }}
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-card v-for="(obj, idx) in props.data.stepArray" :key="idx" class="mt-1 bg-blue-grey-darken-4">
                    <template v-for="(value, key) in obj">
                        <v-card-text v-if="key === 'current_status'" class="font-weight-bold">
                            {{ value }}
                        </v-card-text>
                        <v-card-text v-if="key === 'next_step'">
                            <v-row>
                                <v-col cols="6">{{ key }}</v-col>
                                <v-col cols="6">{{ value }}</v-col>
                            </v-row>
                        </v-card-text>
                    </template>
                </v-card>
            </v-card-text>
        </v-card>
        <handle type="source" :position="Position.Right" class="handle right-handle"/>
    </div>
</template>
<script setup>
import { Handle, Position } from '@vue-flow/core'

import {onMounted} from "vue";
const props = defineProps({
    id: String,
    type: String,
    data: Object,
    position: Object,
})

onMounted(() => {})
</script>
<style scoped>
.node-wrapper {
    position: relative;
}

.handle {
    width: 25px;
    height: 25px;
    background-color: lightblue;
    border: 3px solid green;
    border-radius: 50%;
}

.right-handle {
    right: -5px;
}

:deep(.vue-flow__handle) {
    width: 25px;
    height: 25px;
    background-color: lightblue;
    border: 3px solid green;
}

:deep(.vue-flow__handle-right) {
    right: -3px;
}
</style>