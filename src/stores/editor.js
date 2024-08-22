import editorApi from '@/api/editor.js'
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {MarkerType} from "@vue-flow/core";

export const useEditorStore = defineStore('editor', () => {

    // left-menu list
    const scnList = ref([])

    // choose scn data
    const scnInfo = ref({})

    // node position setting
    let positionX = 100
    let positionY = 10

    const getScnList = () => {
        console.log('editor.getScnList()')

        editorApi.getScnList((nodeList) => {

            if (nodeList && nodeList.length > 0) {
                scnList.value = []
                nodeList.forEach(node => {
                    let result = {}
                    result.type = node.type

                    let nodeList = []
                    node.list.forEach((item) => {
                        nodeList.push(item)
                    })

                    result.list = nodeList
                    scnList.value.push(result)
                })
            }
        }, (err) => {
            console.error('editor.getScnList ERROR : ', err)
        })
    }

    const getScnInfo = (param) => {
        console.log('editor.getScnInfo()')

        editorApi.getScnDetail(param, (nodeDetail) => {
            if (nodeDetail && nodeDetail.seqno > 0) {
                scnInfo.value = {}

                scnInfo.value.type = nodeDetail.type
                scnInfo.value.seqno = nodeDetail.seqno

                if (nodeDetail.step_list && nodeDetail.step_list.length > 0) {
                    let result = []
                    nodeDetail.step_list.forEach((item) => {
                        result.push(item)
                    })
                    scnInfo.value.stepList = result
                }
            }
        }, (err) => {
            console.error('editor.getScnInfo ERROR : ', err)
        })
    }

    const extractActions = (item) => {
        let action = {}

        let actionArray = JSON.parse(item.event_actions)

        // node type setting
        // init(INIT), step
        let nodeType = 'step'
        if (item.step_id === 'INIT') {
            nodeType = 'init'
        }

        action.type = nodeType
        action.id = item.step_id // target id
        action.position = {
            x: positionX,
            y: positionY,
        }

        // TODO : position setting
        positionX = positionX + 500

        for (let i = 0; i < actionArray.length; i++) {
            if (actionArray[i].hasOwnProperty('next_step_id')) {
                actionArray[i].id = `${item.step_id}_${i}_${actionArray[i].next_step_id}` // source_id
            }
        }

        action.data = {
            stepId: item.step_id,
            stepAction: actionArray
        }

        return action
    }

    const scnNodes = computed(() => {
        let result = []

        positionX = 100 // TODO: position setting
        if (scnInfo.value.stepList !== undefined && scnInfo.value.stepList.length > 0) {
            scnInfo.value.stepList.forEach((item) => {
                let obj = extractActions(item)
                result.push(obj)
            })

            // END 노드 추가
            result.push({
                type: 'end',
                id: 'END',
                position: {
                    x: positionX,
                    y: positionY,
                },
            })
        }

        console.log('scnNodes result : ', result)

        return result
    })

    const scnEdges = computed(() => {
        let result = []
        let idx = 0 // temp

        if (scnNodes.value !== [] && scnNodes.value.length > 0) {
            scnNodes.value.forEach(item => {
                if (item.id !== 'END') {
                    // TODO: edge line color setting : step
                    item.data.stepAction.forEach(obj => {
                        // stepAction id : source -> next_step_id : target
                        if (obj.hasOwnProperty("id") && obj.hasOwnProperty("next_step_id")) {
                            let edge = {
                                id: `edge-${idx++}`,
                                source: item.data.stepId,
                                sourceHandle: obj.id, // 사실 같은값임...ㅇㅂㅇ...
                                target: obj.next_step_id,
                                targetHandle: obj.next_step_id,
                            }

                            // target : end
                            if (obj.next_step_id === 'END') {
                                edge.style = { stroke: 'red', border: 'dashed' }
                                edge.markerEnd = MarkerType.ArrowClosed
                            }

                            // label : action_type
                            if (obj.hasOwnProperty("cg_action_type")) {
                                edge.label = obj.cg_action_type
                                edge.labelBgStyle = { fill: 'orange' }
                                edge.labelStyle = { fontWeight: 'bold', fill: 'white', fontSize: '14px' }
                            }

                            result.push(edge)
                        }
                    })
                }
            })
        }
        console.log('scnEdges : ', result)

        return result
    })

    return {
        scnList,
        scnInfo,
        scnNodes,
        scnEdges,
        getScnList,
        getScnInfo,
        extractActions,
    }
})