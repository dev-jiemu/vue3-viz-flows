<template>
    <main-header :mode="mode"/>

    <main-left-menu/>

    <v-main class="ma-5">
        <router-view/>
    </v-main>
</template>
<script setup>
import {RouterView} from 'vue-router'
import MainHeader from "@/components/common/header.vue";
import MainLeftMenu from "@/components/viewers/viewer_left_menu.vue"

const mode = 'viewer'
</script>