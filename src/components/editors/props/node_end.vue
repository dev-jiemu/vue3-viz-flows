<template>
    <div class="node-wrapper">
        <div style="width: 300px;" class="pa-2">
            <div class="text-h6">
                <v-row>
                    <v-col cols="1" class="text-center mr-1">
                        <v-icon icon="mdi-ray-end" size="x-small"/>
                        <handle type="target" :position="Position.Left" class="handle-target" style="top: 30px;"/>
                    </v-col>
                    <v-col class="text-left ml-1">END</v-col>
                </v-row>
            </div>
        </div>
        <v-divider/>
        <div class="ma-1">
            <div class="pa-2">
                <v-row>
                    <v-col cols="9">
                        <v-chip color="red" variant="outlined" size="small">GO_END</v-chip>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<script setup>

import {Handle, Position} from "@vue-flow/core";
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