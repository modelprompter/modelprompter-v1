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
      "name": "POST_DATA"
    }
  ],
  // "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])
Blockly.JavaScript['on_start'] = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, 'POST_DATA')
  return code
}










/**
 * Sends a POST message to an endpoint
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "server_message_post",
  "message0": "POST message to %1 with %2 on success: %3 on error: %4",
  'style': 'api_blocks',
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "URL",
      "align": "RIGHT"
    },
    {
      "type": "input_value",
      "name": "DATA",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "THEN_STATEMENTS",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "ERROR_STATEMENTS",
      "align": "RIGHT"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['server_message_post'] = function (block) {
  const url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_NONE) || []
  const data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || []
  const onThen = Blockly.JavaScript.statementToCode(block, 'THEN_STATEMENTS') || 'null'
  const onError = Blockly.JavaScript.statementToCode(block, 'ERROR_STATEMENTS') || 'null'

  let code = `serverMessagePost(${url}, ${data}, function () {return ${onThen}}, function () {return ${onError}});\n`
  return code
}




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
      "name": "DATA"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['feed_send_data'] = function (block) {
  const data = Blockly.JavaScript.statementToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || []
  return `feedSendData(${data})`
}


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

Blockly.JavaScript['server_message_post_response'] = function (block) {
  return ''
}




export default {}
