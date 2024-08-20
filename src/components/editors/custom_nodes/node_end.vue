<template>
    <div class="node-wrapper">
        <div style="width: 300px;" class="pa-2">
            <div class="text-h6" style="height: 40px;">
                <v-row>
                    <v-col cols="1" class="text-center">
                        <handle type="target" :position="Position.Left" class="handle-target" style="top: 20px;"/>
                        <v-icon class="mb-1 ml-2" icon="mdi-ray-end" size="x-small"/>
                    </v-col>
                    <v-col class="text-left ml-1">WAIT_END</v-col>
                </v-row>
            </div>
        </div>
        <v-divider class="mt-1"/>
        <div class="ma-1">
            <template v-for="(item) in props.data.stepAction">
                <div class="pa-2">
                    <v-row>
                        <v-col cols="9" class="text-left mt-2">
                            <v-chip color="red" variant="outlined" size="small">{{ item.next_step_id }}</v-chip>
                        </v-col>
                        <v-col cols="1" class="text-center mt-2">
                            <v-icon icon="mdi-dots-horizontal-circle-outline" size="small" color="blue"></v-icon>
                        </v-col>
                    </v-row>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import {Handle, Position} from "@vue-flow/core"

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

.handle-target {
    width: 20px !important;
    height: 20px !important;
    background-color: lightpink !important;
    border: 3px solid darkred !important;
    border-radius: 50% !important;
    z-index: 1;
}
</style>