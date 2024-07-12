<template>
    <div class="node-wrapper">
        <handle type="target" :position="Position.Left" class="handle left-handle"/>
        <v-card class="bg-teal-darken-3" width="300">
            <v-card-title>
                {{ props.data.stepName }}
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-card v-for="(obj, idx) in props.data.stepArray" :key="idx" class="mt-1 bg-teal-darken-4">
                    <template v-for="(value, key) in obj">
                        <v-card-text v-if="key === 'current_status'" class="font-weight-bold">
                            {{ value }}
                        </v-card-text>
                        <v-card-text v-if="key === 'next_step' || key === 'prev_step'">
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
import {Handle, Position} from "@vue-flow/core";

const props = defineProps({
    id: String,
    type: String,
    data: Object,
    position: Object,
})
</script>

<style scoped>
.node-wrapper {
    position: relative;
}

.handle {
    width: 25px !important;
    height: 25px !important;
    background-color: lightcyan !important;
    border: 3px solid darkkhaki !important;
    border-radius: 50% !important;
    z-index: 1;
}

.left-handle {
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
}

.right-handle {
    position: absolute;
    right: -12px;
    top: 50%;
    transform: translateY(-50%);
}

:deep(.vue-flow__handle) {
    width: 25px;
    height: 25px;
    background-color: lightcyan;
    border: 3px solid darkkhaki;
}

:deep(.vue-flow__handle-left) {
    left: -12px;
}

:deep(.vue-flow__handle-right) {
    right: -12px;
}
</style>