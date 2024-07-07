<template>
    <baklava-editor :view-model="baklava"></baklava-editor>
    <vue-json-pretty :data="stepsData"></vue-json-pretty>
</template>
<script setup>
import {BaklavaEditor, useBaklava} from "@baklavajs/renderer-vue";
import {applyResult, DependencyEngine} from "baklavajs";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {onMounted, ref} from "vue";
import {InitNode} from "@/nodes/Init.js";
import {StepNode} from "@/nodes/Step.js";
import {EndNode} from "@/nodes/End.js";

const baklava = useBaklava()
baklava.settings.enableMinimap = true
baklava.settings.displayValueOnHover = true

const engine = new DependencyEngine(baklava.editor)

const token = Symbol()
engine.events.afterRun.subscribe(token, (result) => {
    engine.pause()
    applyResult(result, baklava.editor)
    engine.resume()
})
engine.start()

// sample flow json
const sampleData = `
STEP:FIRST
[
    {
        "next_flow": "STEP1"
    },
    {
        "next_flow": "END"
    }
]


STEP:STEP1
[
    {
        "next_flow": "STEP2"
    },
    {
        "next_flow": "ERROR"
    },
    {
        "next_flow": "END"
    }
]

STEP:STEP2
[
    {
        "next_flow": "END"
    },
    {
        "next_flow": "ERROR"
    }
]
`

// STEP 부분을 추출하고 array로 변환
function extractSteps(data) {
    const stepPattern = /STEP:(\w+)\n\[(.*?)\]/gs;
    const steps = [];
    let match;

    while ((match = stepPattern.exec(data)) !== null) {
        // STEP명을 추출
        const stepName = match[1];

        // STEP 밑의 array를 JSON object로 변환
        const stepArray = JSON.parse(`[${match[2]}]`);

        steps.push({ stepName, stepArray });
    }

    return steps;
}

function stepNodeCreate(stepName) {
    let node

    if (stepName === "FIRST") {
        node = new InitNode()
        node.title = stepName
    }



    return node;
}

// 데이터 처리
const stepsData = ref([])
const nodesData = ref([])

onMounted(() => {
stepsData.value = extractSteps(sampleData)

    let prevStep = ''
    if (stepsData.value.length > 0) {
        stepsData.value.forEach((item) => {
            // step node create
            let node = stepNodeCreate(item.stepName)
            // baklava.editor.registerNodeType(InitNode) TODO: 확인요망

            if (prevStep !== '') {
                item.stepArray.forEach((obj) => {
                    obj['prev_step'] = prevStep
                })
            }
            prevStep = item.stepName
        })
    }
})
</script>