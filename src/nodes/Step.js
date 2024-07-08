import {ButtonInterface, defineNode, NodeInterface, SliderInterface, TextInterface} from "baklavajs";

// https://github.com/newcat/baklavajs/blob/master/docs/nodes/pre-defined-interfaces.md
export const StepNode = defineNode({
    type: "StepNode",
    title: 'STEP',
    inputs: {
        prev_field: () => new NodeInterface("prev_field", "test"),
        button: () => new ButtonInterface("Button", () => alert('test')),
        text: () => new TextInterface("Text", "Hello Text"),
        slider: () => new SliderInterface("Slider", 0.5, 0, 1)
    },
    outputs: {
        field1: () => new NodeInterface("field1", "field1"),
        field2: () => new NodeInterface("field2", "field2"),
        field3: () => new NodeInterface("field3", "field3"),
    },
})

/*
registerDynamicNode(nodeData) {
      const { type, title, inputs, outputs } = nodeData;

      const dynamicNode = defineNode({
        type,
        title,
        inputs: inputs.reduce((acc, input) => {
          acc[input.name] = () => new NodeInterface(input.label, input.value);
          return acc;
        }, {}),
        outputs: outputs.reduce((acc, output) => {
          acc[output.name] = () => new NodeInterface(output.label, output.value);
          return acc;
        }, {}),
      });

      this.editor.registerNodeType(dynamicNode);
    }
 */