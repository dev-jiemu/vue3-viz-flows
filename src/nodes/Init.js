import {defineNode, NodeInterface, TextInterface} from "baklavajs";

export const InitNode = defineNode({
    type: "InitNode",
    title: 'INIT',
    outputs: {
        next_field: () => new NodeInterface("next_field", "")
    },
})