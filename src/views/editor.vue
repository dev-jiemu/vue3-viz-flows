<template>
    <main-header :mode="mode"/>

    <editor-left-menu/>

    <v-main class="ma-5">
        <router-view/>
    </v-main>
</template>
<script setup>
import MainHeader from "@/components/common/header.vue";
import EditorLeftMenu from "@/components/editors/editor_left_menu.vue"
import {RouterView} from "vue-router";

const mode = 'editor'
</script>