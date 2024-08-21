<template>
    <div class="node-wrapper">
        <div class="pa-2" style="width: 300px;">
            <div class="text-h6" style="height: 40px;">
                <v-row>
                    <v-col cols="1" class="text-center mr-1">
                        <v-icon class="mb-1 ml-2" icon="mdi-play-circle-outline" size="x-small"/>
                    </v-col>
                    <v-col class="text-left ml-1">{{ props.data.stepId }}</v-col>
                </v-row>
            </div>
            <v-divider class="mt-1"/>
            <div class="ma-1" ref="stepWrapper">
                <template v-for="(item, idx) in props.data.stepAction">
                    <div class="pa-2">
                        <v-row>
                            <v-col cols="9" class="text-left mt-2">
                                <v-chip color="success" variant="outlined" size="small">{{ item.event_type }}</v-chip>
                                <span v-if="item.cond_code !== null && item.cond_code !== undefined">
                    : <v-chip color="gray" size="small">{{ item.cond_code }}</v-chip>
                </span>
                            </v-col>
                            <v-col cols="1" class="text-center mt-2">
                                <v-icon icon="mdi-dots-horizontal-circle-outline" color="blue"></v-icon>
                            </v-col>
                            <v-col class="text-center mr-1"
                                   v-if="item.next_step_id !== undefined && item.next_step_id !== null">
                                <Handle
                                    :id="item.id"
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
    </div>
</template>
<script setup>
import '@vue-flow/core/dist/style.css';
import {Handle, Position} from "@vue-flow/core";
import {computed, ref} from "vue";

const props = defineProps({
    id: String,
    type: String,
    data: Object,
    position: Object,
})

const stepWrapper = ref(null)

const sourcePosition = computed(() => {
    const length = props.data.stepAction.length
    const spacing = totalHeight.value / length

    const positions = []
    for (let i = 0; i < length; i++) {
        positions.push({top: `${(spacing * i) + 70}px`})
    }

    return positions
})

const totalHeight = computed(() => {
    return stepWrapper.value?.offsetHeight || 0
})

</script>
<style scoped>
.node-wrapper {
    position: relative;
    background-color: white;
    border: 3px double black;
    border-radius: 10px;
}

.handle-source {
    position: absolute;
    width: 20px !important;
    height: 20px !important;
    background-color: lightblue !important;
    border: 2px solid darkkhaki !important;
    border-radius: 50% !important;
    z-index: 1;
}
</style>