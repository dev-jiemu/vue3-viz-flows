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
import {StepNode} from "@/nodes/Step.js";
import {InitNode} from "@/nodes/Init.js";
import {EndNode} from "@/nodes/End.js";

const baklava = useBaklava()
baklava.settings.enableMinimap = true
baklava.settings.displayValueOnHover = true

const engine = new DependencyEngine(baklava.editor)

baklava.editor.registerNodeType(StepNode)
baklava.editor.registerNodeType(InitNode)
baklava.editor.registerNodeType(EndNode)

const token = Symbol()
engine.events.afterRun.subscribe(token, (result) => {
    engine.pause()
    applyResult(result, baklava.editor)
    engine.resume()
})
engine.start()

// sample data
const jsonData = [
    { field1: 'value1', next_field: ''},
    { field1: 'value1', field2: 'value2', next_field: ''},
    { field1: 'value1', field2: 'value2', field3: 'value3', next_field: ''},
    { field1: 'value1', field3: 'value3', next_field: ''}
]

const addNodeWithCoordinates = (nodeType, x, y) => {
    const node = new nodeType();

    baklava.displayedGraph.addNode(node);
    node.position.x = x;
    node.position.y = y;

    return node;
}

onMounted(() => {
    const init = addNodeWithCoordinates(InitNode, 300, 140)
    const step1 = addNodeWithCoordinates(StepNode, 700, 140)
    const end1 = addNodeWithCoordinates(EndNode, 1100, 440)
    const step2 = addNodeWithCoordinates(StepNode, 1100, 140)
    const end = addNodeWithCoordinates(EndNode, 1500, 140)

    baklava.displayedGraph.addConnection(
        init.outputs.next_field,
        step1.inputs.prev_field,
    )
    baklava.displayedGraph.addConnection(
        step1.outputs.field1,
        end1.inputs.prev_field,
    )
    baklava.displayedGraph.addConnection(
        step1.outputs.field2,
        step2.inputs.prev_field,
    )
    baklava.displayedGraph.addConnection(
        step2.outputs.field3,
        end.inputs.prev_field,
    )
})
</script>