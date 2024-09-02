<template>
    <v-card>
        <v-card-text class="text-h6 font-weight-bold text-left ml-3 mt-3">
            * json_ui custom create
        </v-card-text>
        <v-divider/>
        <v-card-text class="text-left ml-3 mt-3">
            Result
        </v-card-text>
    </v-card>
</template>
<script setup>
import {ref} from "vue";

const temp = ref([
    {
        type: "string",
        name: "field1",
        value: "test",
        depth: 1,
    },
    {
        type: "object",
        name: "field2",
        depth: 1,
        value: {
            type: "string",
            name: "field2-2",
            value: "test2",
            depth: 2,
        }
    }
])
</script>