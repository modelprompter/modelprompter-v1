import Blockly from 'blockly'

/**
 * Main start block
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "on_start",
  "message0": "🤖 On start do the following: %1 %2",
  'style': 'event_blocks',
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "statements"
    }
  ],
  // "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['on_start'] = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, 'args0')
  console.log(code)
  return code
  // return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
}










/**
 * Sends a POST message to an endpoint
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "server_message_post",
  "message0": "POST message with: %1 on success: %2 on error: %3",
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
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

/**
 * Contains the data
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "server_message_post_response",
  "message0": "Response data",
  'style': 'variable_blocks',
  "output": null,
  "tooltip": "",
  "helpUrl": ""
}])



/**
 * Sends data to the feed
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "feed_send_data",
  "message0": "Send data to feed %1",
  'style': 'math_blocks',
  "args0": [
    {
      "type": "input_value",
      "name": "data"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])




export default {}
