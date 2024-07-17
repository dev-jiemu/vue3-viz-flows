<template>
    <main-header/>

    <main-left-menu/>

    <v-main class="ma-5">
        <router-view/>
    </v-main>
</template>
<script setup>
import {RouterView} from 'vue-router'
import MainHeader from "@/components/common/header.vue";
import MainLeftMenu from "@/components/common/left_menu.vue"
</script>