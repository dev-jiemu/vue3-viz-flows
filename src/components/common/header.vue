<template>
    <v-app-bar
        :color="colors"
        height="80"
    >
        <v-row>
            <v-col cols="8" class="text-left" @click="goMain">
                <div class="text-h5 pa-2 ml-4">
                    <v-icon size="small" v-if="props.mode === 'viewer'">mdi-monitor-shimmer</v-icon>
                    <v-icon size="small" v-if="props.mode === 'editor'">mdi-brush-outline</v-icon>
                    Scenario Node
                    <span v-if="props.mode === 'viewer'">Viewer</span>
                    <span v-if="props.mode === 'editor'">Editor</span>
                </div>
            </v-col>
            <v-col cols="4" class="text-right"></v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";

const props = defineProps(['mode'])

const router = useRouter()

const goMain = () => {
    router.push('/')
}

const colors = computed(() => {
    if (props.mode === 'viewer') {
        return 'light-green-lighten-4'
    } else if (props.mode === 'editor') {
        return ''
    }
})
</script>