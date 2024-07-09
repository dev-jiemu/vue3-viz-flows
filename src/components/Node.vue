<template>
    <v-card
        class="ma-1 draggable"
        :width="props.width"
    >
        <v-card-title class="draggable-handle">
            <v-row>
                <v-col cols="10">
                    {{ props.item.stepName }}
                </v-col>
                <v-col cols="2" class="text-right draggable-handle">
                    <v-icon>mdi-drag</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-card v-for="(obj, idx) in props.item.stepArray" :key="idx" class="ma-1">
                <template v-for="(value, key) in obj">
                    <v-card-title v-if="key === 'current_status'">
                        {{ value }}
                    </v-card-title>
                    <!-- TODO: detail -->
                    <v-card-text v-if="key === 'next_step' || key === 'prev_step'">
                        <v-row>
                            <v-col cols="6" class="font-weight-bold">{{ key }}</v-col>
                            <v-col cols="6">{{ value }}</v-col>
                        </v-row>
                    </v-card-text>
                </template>
            </v-card>
        </v-card-text>
    </v-card>
</template>
<script setup>
import interact from "interactjs";
import {onMounted, ref, watch} from "vue";

const props = defineProps(['item', 'width'])
const emit = defineEmits(['update:position'])

const position = ref({
    x: props.item.position.x,
    y: props.item.position.y
})

onMounted(() => {
    interact('.draggable').draggable({
        listeners: {
            start(event) {},
            move (event) {
                position.value.x += event.dx
                position.value.y +=  event.dy

                event.target.style.transform =`translate(${position.value.x}px, ${position.value.y}px)`
            }
        },
        // Set draggable handle
        handle: '.draggable-handle'
    })
})

watch(position.value, (newPosition) => {
    emit('update:position', props.item.stepName, newPosition)
})

</script>
<style>
.draggable {
    touch-action: none;
    user-select: none;
}

.draggable-handle {
    cursor: grab;
}

.draggable-handle:active {
    cursor: grabbing;
}
</style>
