import {defineNode, NodeInterface, TextInterface} from "baklavajs";


export const EndNode = defineNode({
    type: "EndNode",
    title: "END",
    inputs: {
        prev_field: () => new NodeInterface("prev_field", "END")
    }
})