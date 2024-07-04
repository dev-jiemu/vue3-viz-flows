<template>
    <v-container>
        <div style="width: 100%; height: 90vh">
            <baklava-editor :view-model="baklava"/>
        </div>
    </v-container>
</template>

<script setup>
import {BaklavaEditor, useBaklava} from "@baklavajs/renderer-vue"
import "@baklavajs/themes/dist/syrup-dark.css";
import {MathNode} from "@/nodes/example/Math.js";
import {DisplayNode} from "@/nodes/example/Display.js";
import {applyResult, DependencyEngine} from "baklavajs";
import {onMounted} from "vue";

// https://v2.baklava.tech/getting-started.html 기본세팅 참고
const baklava = useBaklava()
baklava.settings.enableMinimap = true

const engine = new DependencyEngine(baklava.editor)

baklava.editor.registerNodeType(MathNode)
baklava.editor.registerNodeType(DisplayNode)

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
    const node1 = addNodeWithCoordinates(MathNode, 300, 140)
    const node2 = addNodeWithCoordinates(DisplayNode, 550, 140)
    baklava.displayedGraph.addConnection(
        node1.outputs.result,
        node2.inputs.value,
    )
})
</script>