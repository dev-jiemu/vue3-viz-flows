<template>
  <v-main>
      <v-container>
          <div style="width: 90vw; height: 90vh">
              <BaklavaEditor :view-model="baklava" />
          </div>
      </v-container>
  </v-main>
</template>

<script setup>
import { BaklavaEditor, useBaklava } from "@baklavajs/renderer-vue"
import "@baklavajs/themes/dist/syrup-dark.css";

// https://v2.baklava.tech/getting-started.html 기본세팅 참고
const baklava = useBaklava()
</script>