<template>
    <v-card-text class="pa-2">
        <v-row>
            <v-col cols="9" class="text-left mt-2">
                <v-chip color="primary" variant="outlined" size="small">{{props.item.event_type}}</v-chip>
                <span v-if="props.item.cond_code !== null && props.item.cond_code !== undefined">
                    : <v-chip color="gray" size="small">{{props.item.cond_code}}</v-chip>
                </span>
            </v-col>
            <v-col cols="1" class="text-center mt-2">
                <v-icon icon="mdi-details" size="small" color="blue"></v-icon>
            </v-col>
            <v-col class="text-center mt-2 mr-1" v-if="props.item.next_step_id !== undefined && props.item.next_step_id !== null">
                <v-icon icon="mdi-circle" size="x-small"></v-icon>
            </v-col>
        </v-row>
    </v-card-text>
</template>
<script setup>
import {onMounted, ref} from "vue";

const props = defineProps(['item', 'step', 'index'])

const sourceId = ref('')

onMounted(() => {
    sourceId.value = `${props.step}_${props.index}_${props.item.next_step_id}`
    console.log(sourceId.value)
})
</script>