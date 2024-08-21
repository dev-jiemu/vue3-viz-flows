<template>
    <div class="node-wrapper">
        <div style="width: 100px;" class="pa-2">
            <div class="text-h6" style="height: 40px;">
                <v-row>
                    <v-col cols="1" class="text-center">
                        <Handle
                            :id="'END'"
                            type="target"
                            :position="Position.Left"
                            class="handle-target"
                            style="top: 20px;"/>
                        <v-icon class="mb-1 ml-2" icon="mdi-stop-circle-outline" size="x-small"/>
                    </v-col>
                    <v-col class="text-left ml-3">END</v-col>
                </v-row>
            </div>
        </div>
    </div>
</template>
<script setup>
import {Handle, Position} from "@vue-flow/core"

</script>
<style scoped>
.node-wrapper {
    position: relative;
    background-color: lightgray;
    border: 2px solid red;
    border-radius: 10px;
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