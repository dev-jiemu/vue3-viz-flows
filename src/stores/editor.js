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
            if (nodeDetail && nodeDetail.seqno !== 0 && nodeDetail.length > 0) {
                scnInfo.value.type = nodeDetail.type
                scnInfo.value.seqno = nodeDetail.seqno

                let result = []
                nodeDetail.step_list.forEach((item) => {
                    result.push(item)
                })

                scnInfo.value.stepList = result
            }
        }, (err) => {
            console.error('editor.getScnInfo ERROR : ', err)
        })
    }

    return {
        scnList,
        scnInfo,
        getScnList,
        getScnInfo,
    }
})