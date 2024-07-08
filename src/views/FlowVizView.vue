<template>
    <baklava-editor :view-model="baklava"></baklava-editor>
    <vue-json-pretty :data="stepsData"></vue-json-pretty>
</template>
<script setup>
import {BaklavaEditor, useBaklava} from "@baklavajs/renderer-vue";
import {applyResult, defineNode, DependencyEngine, NodeInterface, TextInterface} from "baklavajs";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import {onMounted, ref} from "vue";
import {StepNode} from "@/nodes/Step.js";
import {EndNode} from "@/nodes/End.js";

const baklava = useBaklava()
baklava.settings.enableMinimap = true
baklava.settings.displayValueOnHover = true

baklava.editor.registerNodeType(StepNode, {title: 'STEP_SAMPLE'})
baklava.editor.registerNodeType(EndNode)

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
        "next_step": "STEP1",
        "request_api": "/STEP2/new"
    },
    {
        "next_step": "END"
    }
]

STEP:STEP1
[
    {
        "next_step": "STEP2",
        "play_ment": "STEP2 인데요"
    },
    {
        "next_step": "END"
    }
]

STEP:STEP2
[
    {
        "next_step": "END"
    }
]

STEP:END
[
    {}
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

        steps.push({stepName, stepArray});
    }

    return steps;
}

function createRegisterNode(stepName, obj) {
    let inputs = {}
    let outputs = {}

    const inputKeys = ['prev_step', 'play_ment', 'request_api']
    const outputKeys = ['next_step']

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (inputKeys.includes(key)) {
                if (key === 'prev_step') {
                    inputs[key] = () => new NodeInterface(key, value);
                } else {
                    inputs[key] = () => new TextInterface(key, value);
                }
            } else if (outputKeys.includes(key)) {
                if (key === 'next_step') {
                    outputs[key] = () => new NodeInterface(key, value);
                } else {
                    outputs[key] = () => new TextInterface(key, value);
                }
            }
        }
    }

    return defineNode({
        type: stepName,
        title: stepName,
        inputs: inputs,
        outputs: outputs,
    });
}

// 데이터 처리
const stepsData = ref([])

const addNodeWithCoordinates = (nodeType, x, y) => {
    const node = new nodeType();

    baklava.displayedGraph.addNode(node);
    node.position.x = x;
    node.position.y = y;

    return node;
}

onMounted(() => {
    stepsData.value = extractSteps(sampleData)

    let nodes = []

    let positionX = 300
    let positionY = 140

    let prevStep = ''
    let prevEndStep = false

    if (stepsData.value.length > 0) {
        for (let i = 0; i <= stepsData.value.length; i++) {

            positionX = 300 + (400 * i)
            positionY = 140

            if (i < stepsData.value.length) {
                let item = stepsData.value[i]

                if (prevStep !== '') {
                    item.stepArray.forEach((obj) => {
                        obj['prev_step'] = prevStep;
                    })
                }

                item.stepArray.forEach((obj) => {
                    let node = createRegisterNode(item.stepName, obj)
                    baklava.editor.registerNodeType(node)

                    nodes.push({
                        node: node,
                        x: positionX,
                        y: positionY
                    })

                    positionY = positionY + 300

                    if (obj.hasOwnProperty('next_step') && obj['next_step'] === "END") {
                        prevEndStep = true
                    }
                })

                if (prevEndStep && prevStep !== '' && prevStep !== item.stepName) {
                    let endNode = createRegisterNode('END', {prev_step: prevStep})

                    nodes.push({
                        node: endNode,
                        x: positionX,
                        y: positionY
                    })

                    prevEndStep = false
                }

                prevStep = item.stepName
            }
        }
    }

    nodes.forEach(({node, x, y}) => addNodeWithCoordinates(node, x, y))
})
</script>