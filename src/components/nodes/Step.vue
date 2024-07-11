<template>
    <v-card class="bg-green-darken-3">
        <handle type="target" :position="Position.Left"/>
        <!-- TODO: title color -->
        <v-card-title>
            <v-row>
                <v-col cols="10">
                    {{ props.item.stepName }}
                </v-col>
                <v-col cols="2" class="text-right">
                    <v-icon>mdi-drag</v-icon>
                </v-col>
            </v-row>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-card v-for="(obj, idx) in props.item.stepArray" :key="idx" class="mt-1">
                <template v-for="(value, key) in obj">
                    <v-card-text v-if="key === 'current_status'" class="font-weight-bold">
                        {{ value }}
                    </v-card-text>
                    <!-- TODO: detail -->
                    <v-card-text v-if="key === 'next_step' || key === 'prev_step'">
                        <v-row>
                            <v-col cols="6">{{ key }}</v-col>
                            <v-col cols="6">{{ value }}</v-col>
                        </v-row>
                    </v-card-text>
                </template>
            </v-card>
        </v-card-text>
        <handle type="source" :position="Position.Right"/>
    </v-card>
</template>
<script setup>
import {Handle, Position} from "@vue-flow/core";

const props = defineProps(['item'])
</script>