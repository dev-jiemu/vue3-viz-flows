<template>
    <v-tooltip
        :text="props.message"
        location="top"
    >
        <template v-slot:activator = "{ props }">
            <v-btn
                class="ml-2"
                v-bind="props"
                variant="text"
                density="compact"
                icon="mdi-comment-processing-outline"
                color="deep-orange"
            >
            </v-btn>
        </template>
    </v-tooltip>
</template>
<script setup>
const props = defineProps(['message'])
</script>