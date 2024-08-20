import editorApi from '@/api/editor.js'
import {defineStore} from "pinia";
import {computed, ref} from "vue";

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
        // init(INIT), step, end(WAIT_END)
        let nodeType = 'step'
        if (item.step_id === 'INIT') {
            nodeType = 'init'
        } else if (item.step_id === 'WAIT_END') {
            nodeType = 'end'
        }

        action.type = nodeType
        action.id = item.step_id // target id
        action.position = {
            x: positionX,
            y: positionY,
        }

        // TODO : position setting
        positionX = positionX + 400

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
        }

        console.log('scnNodes result : ', result)

        return result
    })

    // TODO : edges 구성
    const scnEdges = computed(() => {
        let result = []

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