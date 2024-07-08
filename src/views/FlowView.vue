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

const addNodeWithCoordinates = (nodeType, x, y) => {
    const node = new nodeType();

    baklava.displayedGraph.addNode(node);
    node.position.x = x;
    node.position.y = y;

    return node;
}

onMounted(() => {
    const nodes = [
        { node: InitNode, x: 300, y: 140 },
        { node: StepNode, x: 700, y: 140 },
        { node: EndNode, x: 1100, y: 640 },
        { node: StepNode, x: 1100, y: 140 },
        { node: EndNode, x: 1500, y: 140 }
    ]

    const createdNodes = nodes.map(({ node, x, y }) => addNodeWithCoordinates(node, x, y));

    const connections = [
        { from: createdNodes[0].outputs.next_field, to: createdNodes[1].inputs.prev_field },
        { from: createdNodes[1].outputs.field1, to: createdNodes[2].inputs.prev_field },
        { from: createdNodes[1].outputs.field2, to: createdNodes[3].inputs.prev_field },
        { from: createdNodes[3].outputs.field3, to: createdNodes[4].inputs.prev_field }
    ]

    connections.forEach(({ from, to }) => {
        baklava.displayedGraph.addConnection(from, to);
    })
})
</script>