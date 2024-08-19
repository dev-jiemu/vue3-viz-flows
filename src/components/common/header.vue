<template>
    <v-app-bar
        color="grey-lighten-2"
        height="80"
        flat
    >
        <v-row>
            <v-col cols="8" class="text-left" @click="goMain">
                <div class="text-h5 pa-2 ml-4">
                    <v-icon size="small">mdi-brush-outline</v-icon>
                    Scenario Node Editor</div>
            </v-col>
            <v-col cols="4" class="text-right">
                <!-- TODO: edit mode -->
                <v-btn class="mt-2 mr-4" variant="outlined" prepend-icon="mdi-pencil">
                    EDIT
                </v-btn>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup>

import router from "@/router/index.js";

const goMain = () => {
    router.push('/editor')
}
</script>