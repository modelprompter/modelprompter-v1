import Blockly from 'blockly'

Blockly.common.defineBlocksWithJsonArray([
  /**
   * Sends a POST message to an endpoint
   */
  {
    "type": "server_message_post",
    "message0": "POST message with: %1 then: %2 on error: %3 finally: %4",
    'style': 'api_blocks',
    "args0": [
      {
        "type": "input_value",
        "name": "data",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "thenStatements",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "errorStatements",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "finallyStatements",
        "align": "RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": ""
  },

  {
    "type": "on_start",
    "message0": "🤖 On start do the following: %1 %2",
    'style': 'procedure_blocks',
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "statements"
      }
    ],
    "nextStatement": null,
    "tooltip": "",
    "helpUrl": ""
  }
])




export default {}
