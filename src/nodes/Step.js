import {defineDynamicNode} from "baklavajs";

export const StepNode = defineDynamicNode({
    type: "StepNode",
    onCreate(node) {
        node.title = ''
        node.inputs = {}
        node.outputs = {}
    }
})