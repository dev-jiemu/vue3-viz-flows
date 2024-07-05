import {defineDynamicNode, defineNode, NodeInterface} from "baklavajs";

export const StepNode = defineNode({
    type: "StepNode",
    title: 'STEP',
    inputs: {
        prev_field: () => new NodeInterface("prev_field", "")
    }, // create
    outputs: {
        field1: () => new NodeInterface("field1", "field1"),
        field2: () => new NodeInterface("field2", "field2"),
        field3: () => new NodeInterface("field3", "field3"),
    },
})