<template>
    <div class="node-wrapper">
        <v-card class="bg-blue-grey-darken-3">
            
        </v-card>
    </div>
</template>
<script setup>
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