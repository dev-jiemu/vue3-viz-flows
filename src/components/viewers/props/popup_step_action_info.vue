<template>
    <v-card>
        <v-card-title>
            <v-row class="mt-1">
                <v-col cols="8">
                    * Action Detail
                </v-col>
                <v-col cols="4" class="text-right">
                    <v-btn variant="text" icon="mdi-close" density="comfortable" @click="closePopup"/>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <template v-for="(value, key) in props.item">
                <v-row v-if="key !== 'id'">
                    <v-col cols="4" class="text-right font-weight-bold"> {{ key }} </v-col>
                    <v-col cols="8">
                        <vue-json-pretty
                            v-if="typeof value !== 'string'"
                            :data="value"
                            :deep="0">
                        </vue-json-pretty>
                        <span v-else>
                            {{ value }}
                        </span>
                    </v-col>
                </v-row>
            </template>
        </v-card-text>
    </v-card>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const props = defineProps(['item'])
const emits = defineEmits(['close'])

const closePopup = () => {
    emits('close')
}
</script>