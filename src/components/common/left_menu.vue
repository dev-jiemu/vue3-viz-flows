<template>
    <v-navigation-drawer floating>
        <div class="px-2 my-2">
            <v-text-field
                class="mb-4 mt-4"
                label="search"
                density="compact"
                prepend-inner-icon="mdi-magnify"
                variant="solo-filled"
                flat
                hide-details
            ></v-text-field>

            <v-divider></v-divider>

            <v-list v-for="(item, idx) in menuItem">
                <v-list-subheader v-if="item.type === 'subheader'">{{ item.title }}</v-list-subheader>
                <v-divider v-else-if="item.type === 'divider'"/>
                <v-list-item v-else
                    :key="'link ' + idx"
                    :to="item.url"
                    class="text-left"
                    color="primary"
                    rounded="xl">
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

const editorStore = useEditorStore()
const { scnList } = storeToRefs(editorStore)

const menuItem = computed(() => {
    let result = []

    // type, title, url
    scnList.value.forEach((item) => {
        result.push({ type: 'subheader', title: item.type })

        item.list.forEach((node) => {
            result.push({
                title: node.scn_name,
                url: `/editor/${node.scn_seqno}/${item.type}` // /:id/:type
            })
        })

        result.push({ type:'divider' })
    })

    return result
})

onMounted(() => {
    console.log('common.left_menu()')
    editorStore.getScnList()
})
</script>