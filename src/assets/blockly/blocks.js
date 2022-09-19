import Blockly from 'blockly'

Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "server_on_gpu_ready",
    "message0": "On GPU ready %1 %2 %3",
    'style': 'model_blocks',
    "args0": [
      {
        "type": "field_dropdown",
        "name": "server",
        "options": [
          [
            "any",
            "any"
          ],
          [
            "option",
            "OPTIONNAME"
          ],
          [
            "option",
            "OPTIONNAME"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "statements"
      }
    ],
    "tooltip": "Runs everything inside whenever a GPU server is ready",
    "helpUrl": "https://modelprompter.com/docs/blocks/ecd841c948c241579b4a394b7cd60d1c"
  }
])

export default {}
