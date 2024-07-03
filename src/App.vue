<template>
  <v-app>
      <v-main>
          <router-view/>
      </v-main>
  </v-app>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>