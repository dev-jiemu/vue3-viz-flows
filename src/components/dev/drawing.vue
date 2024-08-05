<template>
    <div id="div_background">
        <v-card width="300" class="pa-2">
            <v-card-title class="text-h6">
                <v-row>
                    <v-col cols="1" class="text-center mr-1">
                        <v-icon icon="mdi-circle" size="x-small"></v-icon>
                    </v-col>
                    <v-col class="text-left ml-1">{{ sample.data.stepId }}</v-col>
                </v-row>
            </v-card-title>
            <v-divider/>
            <template v-for="(item, idx) in sample.data.stepAction">
                <prop-action
                    :item="item"
                    :index="idx"
                    :step="sample.data.stepId">
                </prop-action>
            </template>
        </v-card>
    </div>
</template>
<script setup>
/*
    [handle:target] STEP_ID
    --------------------------------
     action_type : codition_status
    [-------------------------------] [handle:source]
    else

    ** 다른 서버의 job은 비동기로 돌아가는데 이건 어떻게 표기할지 고민이 필요함

    target, source handler 명명규칙 정의
    - target: current_step_id
    - source: current_step_id + index + next_step_id

    이렇게 하면 source N : target 1 형태의 edge 를 그릴 수 있음
 */


import {onMounted} from "vue";
import propAction from './prop_action.vue'


// TODO: 데이터 제외하고 push
const sample = {

}
</script>
<style scoped>
#div_background {
    background: darkgray;
    width: 100%;
    height: 100%;
}
</style>