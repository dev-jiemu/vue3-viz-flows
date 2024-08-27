<template>
    <div class="node-wrapper">
        <div class="pa-2" style="width: 350px;">
            <div class="text-h6" style="height: 40px;">
                <v-row>
                    <v-col cols="1" class="text-center">
                        <Handle
                            :id="props.data.step_id"
                            type="target"
                            :position="Position.Left"
                            class="handle-target"
                            style="top: 20px;"/>
                        <v-icon class="mb-1 ml-2" icon="mdi-playlist-play" size="x-small"/>
                    </v-col>
                    <v-col class="text-left ml-3">{{ props.data.step_id }}</v-col>
                </v-row>
            </div>
            <v-divider class="mt-1"/>
            <div class="ma-1" ref="stepWrapper">
                <template v-for="(item, idx) in props.data.step_action">
                    <div class="pa-2">
                        <v-row>
                            <v-col cols="9" class="text-left mt-2">
                                <v-chip color="success" variant="outlined" size="small">{{ item.event_type }}</v-chip>
                                <span v-if="item.cond_code !== null && item.cond_code !== undefined">
                                    : <v-chip color="gray" size="small">{{ item.cond_code }}</v-chip>
                                </span>
                                <prop-tooltip v-if="item.ment_text" :message="item.ment_text"></prop-tooltip>
                            </v-col>
                            <v-col cols="1" class="text-right mt-2 d-flex">
                                <v-icon class="ml-2" icon="mdi-chevron-down" color="indigo" @click="openPopup(item)"></v-icon>
                            </v-col>
                            <v-col class="text-center mt-2"
                                   v-if="item.next_step_id !== undefined && item.next_step_id !== null">
                                <Handle
                                    :id="item.id"
                                    type="source"
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
import {Handle, Position} from "@vue-flow/core";
import {computed, ref} from "vue";
import PropTooltip from "@/components/viewers/props/tooltip.vue";

const props = defineProps({
    id: String,
    type: String,
    data: Object,
    position: Object,
})

const emits = defineEmits(['open-detail'])

const openPopup = (item) => {
    emits('open-detail', item)
}

const stepWrapper = ref(null)

const sourcePosition = computed(() => {
    const length = props.data.step_action.length
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
    border: 1px dashed black;
    border-radius: 10px;
}

.handle-source {
    position: absolute;
    width: 20px !important;
    height: 20px !important;
    background-color: skyblue !important;
    border: 3px solid darkblue !important;
    border-radius: 50% !important;
    z-index: 1;
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