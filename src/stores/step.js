import {defineStore} from "pinia";
import {ref} from "vue";

export const useStepStore = defineStore('step', () => {
    const stepsData = ref([])

    let positionX = 200
    let positionY = 150

    function extractSteps(data) {
        const stepPattern = /STEP:(\w+)\n\[(.*?)\]/gs;
        stepsData.value = []
        let match;

        while ((match = stepPattern.exec(data)) !== null) {
            // STEP명을 추출
            const stepName = match[1]

            // STEP 밑의 array를 JSON object로 변환
            const stepArray = JSON.parse(`[${match[2]}]`)

            // TODO: 저장된거 setting
            const position = {x: positionX, y: positionY}
            positionY += 200

            stepsData.value.push({stepName, position, stepArray})
        }
    }

    return {
        stepsData,
        extractSteps,
    }
})