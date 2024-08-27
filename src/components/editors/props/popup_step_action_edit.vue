<template>
    <v-card>
        <v-card-title>
            <v-row class="mt-1">
                <v-col cols="8"></v-col>
                <v-col cols="4" class="text-right">
                    <v-btn variant="text" icon="mdi-close" density="comfortable" @click="closePopup"/>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <!-- TODO -->
        </v-card-text>
    </v-card>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps(['item'])
const emits = defineEmits(['close', 'update'])

const editAction = ref(props.item)

const closePopup = () => {
    emits('close')
}

const updateAction = () => {
    if(confirm('update?')) {

    }
}

</script>