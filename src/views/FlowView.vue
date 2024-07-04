<template>
    <v-container>
        <div style="width: 100%; height: 90vh">
            <baklava-editor :view-model="baklava"/>
        </div>
    </v-container>
</template>
<script setup>
import {BaklavaEditor, useBaklava} from "@baklavajs/renderer-vue";
import {applyResult, DependencyEngine} from "baklavajs";
import {onMounted} from "vue";

const baklava = useBaklava()
baklava.settings.enableMinimap = true

const engine = new DependencyEngine(baklava.editor)

// TODO
// baklava.editor.registerNodeType

const token = Symbol()
engine.events.afterRun.subscribe(token, (result) => {
    engine.pause()
    applyResult(result, baklava.editor)
    engine.resume()
})
engine.start()


// sample data
const jsonData = [
    { field1: 'value1' },
    { field1: 'value1', field2: 'value2' },
    { field1: 'value1', field2: 'value2', field3: 'value3' }
]

/*
addNode(data) {
      const node = this.editor.createNode('DynamicNode');
      Object.keys(data).forEach(key => {
        node.addInputInterface(key, 'string', data[key]);
      });
      this.editor.addNode(node);
    }
 */

onMounted(() => {
    // TODO
})
</script>