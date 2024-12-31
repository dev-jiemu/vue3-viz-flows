<template>
  <v-app>
    <router-view/>
  </v-app>
</template>
<script setup lang="ts">
import {RouterView} from 'vue-router'
import {onBeforeMount} from "vue";

onBeforeMount(() => {
  console.log('App.vue is created')
})
</script>