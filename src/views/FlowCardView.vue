<template>
    <v-container>
        <!-- TODO: v-for -->
        <v-card width="300">
            <v-card-title>
                TITLE
            </v-card-title>
            <v-divider/>
            <v-card-text>
                <v-card v-for="item in stepsData">
                    {{ item.current_status }}
                </v-card>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script setup>

import {onMounted, ref} from "vue";

const sampleData = `
STEP:FIRST
[
    {
        "current_status": "INIT",
        "message": "로딩중입니다"
    },
    {
        "current_status": "SUCCESS",
        "next_step": "STEP1",
        "request_api": "/STEP2/new"
    },
    {
        "current_status": "FAIL",
        "next_step": "END"
    }
]

STEP:STEP1
[
    {
        "current_status": "LOADING",
        "message": "STEP1 로딩중"
    },
    {
        "current_status": "SUCCESS",
        "message": "STEP1 로딩완료",
        "next_step": "STEP2"
    },
    {
        "current_status": "FAIL",
        "message": "로딩실패",
        "next_step": "END"
    }
]
`

const stepsData = ref([])

function extractSteps(data) {
    const stepPattern = /STEP:(\w+)\n\[(.*?)\]/gs;
    const steps = [];
    let match;

    while ((match = stepPattern.exec(data)) !== null) {
        // STEP명을 추출
        const stepName = match[1]

        // STEP 밑의 array를 JSON object로 변환
        const stepArray = JSON.parse(`[${match[2]}]`)

        steps.push({stepName, stepArray})
    }

    return steps
}


onMounted(() => {
    stepsData.value = extractSteps(sampleData)
    console.log(stepsData.value)
})
</script>