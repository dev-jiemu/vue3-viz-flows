import editorApi from '@/api/editor.js'
import {defineStore} from "pinia";
import {ref} from "vue";

export const useEditorStore = defineStore('editor', () => {

    // left-menu list
    const scnList = ref([])

    // choose scn data
    const scnInfo = ref({})

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

        action = {
            id: '', // TODO: id 규격 정의
            type: nodeType,
            data: {
                stepId: item.step_id,
                stepAction: actionArray
            }
        }

        return action
    }

    return {
        scnList,
        scnInfo,
        getScnList,
        getScnInfo,
        extractActions,
    }
})