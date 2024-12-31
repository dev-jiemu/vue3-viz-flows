import { defineStore } from "pinia"
import { ref } from "vue"
import type { Ref } from "vue"

// STEP 데이터의 타입 정의
interface StepItem {
  current_status: string;
  message?: string;
  next_step?: string;
  request_api?: string;
}

// STEP 데이터 구조의 타입 정의
interface StepData {
  stepName: string;
  stepArray: StepItem[];
}

// stepsData의 아이템 타입 정의
interface StepsDataItem {
  id: string;
  type: 'step' | 'first' | 'end';
  data: StepData;
  position?: { x: number; y: number };
}

// 샘플 데이터와 포지션
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
`;

const samplePosition = [
  { x: 40, y: 5 },
  { x: 520, y: 220 },
  { x: 970, y: 20 },
  { x: 1420, y: 740 },
];

// Pinia 스토어
export const useServiceStore = defineStore('service', () => {
  // stepsData의 타입을 Ref로 정의
  const stepsData: Ref<StepsDataItem[]> = ref([]);

  function extractSteps(): void {
    const stepPattern = /STEP:(\w+)\n\[(.*?)\]/gs;
    stepsData.value = [];
    let match: RegExpExecArray | null;

    while ((match = stepPattern.exec(sampleData)) !== null) {
      // STEP명을 추출
      const stepName = match[1];

      // STEP 밑의 array를 JSON object로 변환
      const stepArray: StepItem[] = JSON.parse(`[${match[2]}]`);

      stepsData.value.push({
        id: "0", // 초기 id, 이후 변경
        type: 'step', // 기본 타입
        data: { stepName, stepArray },
      });
    }

    // Position, ID, Type 설정
    for (let i = 0; i < stepsData.value.length; i++) {
      stepsData.value[i].id = String(i + 1); // 1번 인덱스부터 처리

      // Type 설정
      if (stepsData.value[i].data.stepName === "FIRST") {
        stepsData.value[i].type = 'first';
      } else if (stepsData.value[i].data.stepName === "END") {
        stepsData.value[i].type = 'end';
      }

      // Position 설정
      stepsData.value[i].position = Object.assign({}, samplePosition[i]);
    }
  }

  return {
    stepsData,
    extractSteps,
  };
});
