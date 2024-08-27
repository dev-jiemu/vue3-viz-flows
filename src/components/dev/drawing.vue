`
<template>
    <v-card>
        <v-card-text v-for="item in sampleNodes">
            <div class="text-left text-h6">
                {{ item.data.step_id }}
            </div>
            <v-divider/>
            <v-card
                class="ma-2"
                v-for="action in item.data.step_actions"
            >
                <v-row>
                    <v-col cols="6">
                        <template v-for="(value, key) in action">
                            <v-row>
                                <v-col cols="4">{{ key }}</v-col>
                                <v-col>
                                    <v-text-field
                                        v-model="action[key]"
                                        density="compact"
                                        variant="outlined"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </template>
                    </v-col>
                    <v-col cols="6">
                        <div class="text-left ml-2 mt-2">
                            <span class="text-h6">Preview</span>
                        </div>
                        <vue-json-pretty
                            class="ma-2"
                            showLine
                            showIcon
                            :data="action"
                        ></vue-json-pretty>
                    </v-col>
                </v-row>
            </v-card>
        </v-card-text>
    </v-card>
</template>
<script setup>
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

import {ref} from "vue";

// TODO: 데이터 제외하고 push
const sampleNodes = ref([

])
</script>`