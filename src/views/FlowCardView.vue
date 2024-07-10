<template>
    <div class="ma-3">
        <template v-for="(item, index) in stepsData">
            <node-props
                class="draggable"
                :item="item"
                :width="250"
                :style="getCardPosition(item.position)"
                :data-item-id="index"
                :data-x="item.position.x"
                :data-y="item.position.y"
            ></node-props>
        </template>
    </div>
</template>
<script setup>
import NodeProps from '@/components/card_view/Node.vue'
import {onMounted, ref, watch} from "vue";
import {useStepStore} from "@/stores/step.js";
import {storeToRefs} from "pinia";
import interact from "interactjs";
import {jsPlumb} from "jsplumb";

const stepStore = useStepStore()
const {stepsData} = storeToRefs(stepStore)

const nodeRefs = ref([])

const jsPlumbInstance = jsPlumb.getInstance()

function initializeJsPlumb() {
    console.log('initializeJsPlumb')
    jsPlumbInstance.setContainer(document.querySelector(".ma-3"))

    if (stepsData.value.length > 0) {
        // TODO: item -> forEach(obj, idx) if next_step ?
        // TODO: index 체계 결정해야함
        stepsData.value.forEach((item, index) => {
            console.log('item: ', item)
            const currentNodeId = `node-${index}`
            if (item.next_step) {
                const nextStepIndex = stepsData.value.findIndex(step => step.stepName === item.next_step)
                console.log('nextStepIndex: ', nextStepIndex)
                if (nextStepIndex !== -1) {
                    const nextNodeId = `node-${nextStepIndex}`;
                    jsPlumbInstance.connect({
                        source: currentNodeId,
                        target: nextNodeId,
                        anchors: ["Right", "Left"],  // 왼쪽-오른쪽 연결
                        connector: ["Straight"],
                        endpoint: "Dot",
                        paintStyle: { stroke: "#5c96bc", strokeWidth: 2 },
                        endpointStyle: { fill: "#5c96bc", radius: 3 },
                    });
                }
            }
        })
    }
}

function getCardPosition(position) {
    return {
        position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`
    }
}

interact('.draggable').draggable({
    listeners: {
        start(event) {
            const target = event.target
            const index = target.getAttribute("data-item-id")
            const item = stepsData.value[index]

            // Initialize position attributes if not set
            if (!target.hasAttribute('data-x')) {
                target.setAttribute('data-x', item.position.x)
                target.setAttribute('data-y', item.position.y)
            }
        },
        move(event) {
            const index = event.target.getAttribute("data-item-id")

            // Update the position of the item
            const target = event.target

            // 현재 위치 가져오기
            const initialX = parseFloat(target.getAttribute('data-x')) || 0
            const initialY = parseFloat(target.getAttribute('data-y')) || 0

            // 상대 이동 거리 추가
            const x = initialX + event.dx
            const y = initialY + event.dy

            // 이동 적용
            target.style.transform = `translate(${x}px, ${y}px)`

            // 속성 업데이트
            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)

            // 데이터 업데이트
            stepsData.value[index].position.x = x
            stepsData.value[index].position.y = y

            console.log('Updated position:', stepsData.value[index].position)

            // Revalidate the jsPlumb connections after moving the element
            jsPlumbInstance.revalidate(target)
        }
    }
})

onMounted(() => {
    stepStore.extractSteps()

    // Assign refs to nodeRefs array
    stepsData.value.forEach((item, index) => {
        nodeRefs.value[index] = `node-${index}`
    })

    initializeJsPlumb()
})

watch(stepsData.value, () => {
    initializeJsPlumb()
})
</script>
<style>
.draggable {
    touch-action: none;
    user-select: none;
}
</style>