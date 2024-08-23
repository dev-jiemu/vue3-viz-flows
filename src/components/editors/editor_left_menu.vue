<template>
    <v-navigation-drawer floating color="blue-grey-lighten-5">
        <div class="px-2 my-2">
            <template v-for="item in firstMenu">
                <v-btn
                    class="mr-2 mt-2 mb-2"
                    variant="text"
                    flat
                    :color="item.color"
                    rounded="shaped"
                    :prepend-icon="item.icon"
                >
                    {{ item.text }}
                </v-btn>
            </template>

            <v-divider class="ma-3"/>

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
import {useRouter} from "vue-router";
import {computed} from "vue";
import {useEditorStore} from "@/stores/editor.js";
import {storeToRefs} from "pinia";

const editorStore = useEditorStore()
const {scnList} = storeToRefs(editorStore)

const router = useRouter()

const goRouter = (url) => {
    router.push(url)
}

const firstMenu = computed(() => {
    let result = []

    result.push({icon: 'mdi-monitor-shimmer', text: 'GO VIEWER MODE', url: '/viewer', color: 'indigo-darken-4'})
    result.push({icon: 'mdi-plus', text: 'NEW SCENARIO', url: '/editor/new', color: 'success'})

    return result
})

const menuItem = computed(() => {
    let result = []

    scnList.value.forEach((item) => {
        result.push({type: 'subheader', title: item.type})

        item.list.forEach((node) => {
            result.push({
                title: node.scn_name,
                seqno: node.scn_seqno,
                type: item.type,
                url: `/editor/${node.scn_seqno}/${item.type}`
            })
        })

        result.push({type: 'divider'})
    })

    return result
})

const goDetail = (item) => {
    editorStore.getScnInfo({
        seqno: item.seqno,
        type: item.type,
    })
    router.push(item.url)
}
</script>