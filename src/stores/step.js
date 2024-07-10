import {defineStore} from "pinia";
import {ref} from "vue";

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

export const useStepStore = defineStore('step', () => {
    const stepsData = ref([])

    let positionX = 50
    let positionY = 50

    function extractSteps() {
        const stepPattern = /STEP:(\w+)\n\[(.*?)\]/gs;
        stepsData.value = []
        let match;

        // TODO:: update
        while ((match = stepPattern.exec(sampleData)) !== null) {
            // STEP명을 추출
            const stepName = match[1]

            // STEP 밑의 array를 JSON object로 변환
            const stepArray = JSON.parse(`[${match[2]}]`)

            // TODO: 저장된거 setting
            const position = {x: positionX, y: positionY}
            positionX += 350

            stepsData.value.push({stepName, position, stepArray})
        }
    }

    return {
        stepsData,
        extractSteps,
    }
})