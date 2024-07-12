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

STEP:STEP2
[
    {
        "current_status": "LOADING",
        "message": "STEP2 로딩중"
    },
    {
        "current_status": "SUCCESS",
        "message": "로딩완료",
        "next_step": "END"
    },
    {
        "current_status": "FAIL",
        "message": "로딩실패",
        "next_step": "END"
    }
]

STEP:END
[
    {
        "current_status": "GO_END"
    }
]
`

const samplePosition = [
    {x: 40, y: 5},
    {x: 520, y: 220},
    {x: 970, y: 20},
    {x: 1420, y: 740},
]

export const useServiceStore = defineStore('service', () => {
    const stepsData = ref([])

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

            stepsData.value.push(
                {
                    id: 0,
                    type: 'step',
                    data: {stepName, stepArray},
                }
            )
        }

        // TODO : position, id, type setting
        for (let i = 0; i < stepsData.value.length; i++) {
            stepsData.value[i].id = String(i + 1) // 1번 인덱스부터 처리

            // type setting
            if (stepsData.value[i].data.stepName === "FIRST") {
                stepsData.value[i].type = 'first'
            } else if (stepsData.value[i].data.stepName === "END") {
                stepsData.value[i].type = 'end'
            }

            stepsData.value[i].position = Object.assign(samplePosition[i], {})
        }
    }


    return {
        stepsData,
        extractSteps,
    }
})