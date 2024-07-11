<template>
    <v-card class="bg-blue-grey-darken-3">
        <handle type="target" :position="Position.Left"/>
        <v-card-title>
        </v-card-title>
        <v-divider/>
        <v-card-item>
            ㅇㅂㅇ
        </v-card-item>
        <handle type="source" :position="Position.Right"/>
    </v-card>
</template>
<script setup>
import { Handle, Position } from '@vue-flow/core'
import {onMounted} from "vue";
const props = defineProps(['item'])

onMounted(() => {
    console.log('init props: ', props.item)
})
</script>