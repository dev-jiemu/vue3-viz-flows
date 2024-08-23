<template>
    <v-navigation-drawer floating>
        <div class="px-2 my-2">
            <v-btn flat
                   class="ma-4"
                   variant="outlined"
                   color="teal-darken-4"
                   prepend-icon="mdi-brush-outline"
                   @click="goEditor"
            >
                GO EDITOR MODE
            </v-btn>

            <v-divider class="ma-2"/>

            <v-list v-for="item in menuItem">
                <v-list-subheader v-if="item.type === 'subheader'">{{ item.title }}</v-list-subheader>
                <v-divider v-else-if="item.type === 'divider'"/>
                <v-list-item v-else
                    :key="item.type + '_' + item.seqno"
                    class="text-left"
                    color="success"
                    rounded="xl"
                    @click="goDetail(item)"
                >
                    <v-list-item-title v-text="item.title"/>
                </v-list-item>
            </v-list>
        </div>
    </v-navigation-drawer>
</template>
<script setup>
import {computed, onMounted} from "vue";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const editorStore = useEditorStore()
const { scnList } = storeToRefs(editorStore)

const router = useRouter()

const menuItem = computed(() => {
    let result = []

    // type, title, url
    scnList.value.forEach((item) => {
        result.push({ type: 'subheader', title: item.type })

        item.list.forEach((node) => {
            result.push({
                title: node.scn_name,
                seqno: node.scn_seqno,
                type: item.type,
                url: `/viewer/${node.scn_seqno}/${item.type}`
            })
        })

        result.push({ type:'divider' })
    })

    return result
})

const goEditor = () => {
    router.push('/editor')
}

const goDetail = (item) => {
    editorStore.getScnInfo({
        seqno: item.seqno,
        type: item.type,
    })
    router.push(item.url)
}

onMounted(() => {
    console.log('common.left_menu()')
    editorStore.getScnList()
})
</script>