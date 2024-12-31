import { defineStore } from 'pinia';
import { ref } from 'vue';
import editorApi from '@/api/editor.ts'

export const useEditorStore = defineStore('editor', () => {
  const scnList = ref([])
  const scnInfo = ref([]) // selected-scenario

  const getScnList = () => {
    // TODO:
  }

  const getScnInfo = () => {
    // TODO:
  }

  return {
    scnList,
    scnInfo,

    getScnList,
    getScnInfo,
  }
})