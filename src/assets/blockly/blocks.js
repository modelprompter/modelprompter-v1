import Blockly from 'blockly'

/**
 * Main start block
 */
// @todo We're getting warning because blocks already exist during hot reload
Blockly.common.defineBlocksWithJsonArray([{
  "type": "on_start",
  "message0": "🤖 On start do the following: %1 %2",
  'style': 'api_blocks',
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
  return `
// On Start
setTimeout(() => {
  ${code}
}, 0);`
}


/**
 * Main end block
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "on_end",
  "message0": "🛑 On end do the following: %1 %2",
  'style': 'api_blocks',
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
Blockly.JavaScript['on_end'] = function (block) {
  const code = Blockly.JavaScript.statementToCode(block, 'POST_DATA')
  return `
// On End
dataFeed.onEndMethods.push(() => {
  setTimeout(() => {${code}}, 0)
});`
}








/**
 * Sends a POST message to an endpoint
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "server_message_post",
  "message0": "POST message to %1 with %2 on success: %3 on error: %4 finally, always: %5",
  'style': 'api_blocks',
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
    {
      "type": "input_statement",
      "name": "FINALLY_STATEMENTS",
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
  const onFinally = Blockly.JavaScript.statementToCode(block, 'FINALLY_STATEMENTS') || 'null'

  let code = `
// API call...
serverMessagePost(
  ${url},
  ${data},
  //...on success
  function () {
    ${onThen};
    return arguments;
  },
  //...on error
  function () {
    ${onError};
    return arguments;
  },
  //...on finally
  function () {
    ${onFinally};
    return arguments;
  }
);`
  return code
}




/**
 * Sends data to the feed
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "feed_send_data",
  "message0": "Send data to feed %1 with title %2 and image URL %3",
  'style': 'math_blocks',
  "args0": [
    {
      "type": "input_value",
      "name": "DATA"
    },
    {
      "type": "input_value",
      "name": "TITLE"
    },
    {
      "type": "input_value",
      "name": "IMAGE"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['feed_send_data'] = function (block) {
  const data = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || 'null'
  const title = Blockly.JavaScript.valueToCode(block, 'TITLE', Blockly.JavaScript.ORDER_NONE) || 'null'
  const image = Blockly.JavaScript.valueToCode(block, 'IMAGE', Blockly.JavaScript.ORDER_NONE) || 'null'

  return `
// Send data to feed
feedSendData({
  title: ${title},
  data: ${data},
  image: ${image}
});`
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
  return ['arguments[0]', Blockly.JavaScript.ORDER_ATOMIC]
}



/**
 * JSON/Object
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "json_object",
  "message0": "Objects {key: value} %1 %2",
  'style': 'list_blocks',
  "output": null,
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STATEMENTS"
    }
  ],
  "tooltip": "",
  "hat": "none",
  "helpUrl": ""
}])

Blockly.JavaScript['json_object'] = function (block) {
  const data = Blockly.JavaScript.statementToCode(block, 'STATEMENTS', Blockly.JavaScript.ORDER_NONE) || ''
  return [`{${data}}`, Blockly.JavaScript.ORDER_ATOMIC]
}

/**
 * Object key:value pair
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "json_object_key_value",
  "message0": "key %1 value %2",
  'style': 'list_blocks',
  "inputsInline": true,
  "args0": [
    {
      "type": "input_value",
      "name": "KEY"
    },
    {
      "type": "input_value",
      "name": "VALUE"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['json_object_key_value'] = function (block) {
  const key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_NONE) || []
  const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE) || []
  return `${key}: ${value},\n`
}


/**
 * Object get
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "json_object_get",
  "message0": "Get field %1 from %2",
  'style': 'list_blocks',
  "args0": [
    {
      "type": "input_value",
      "name": "PATH"
    },
    {
      "type": "input_value",
      "name": "OBJECT"
    }
  ],
  "output": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['json_object_get'] = function (block) {
  const path = Blockly.JavaScript.valueToCode(block, 'PATH', Blockly.JavaScript.ORDER_NONE) || []
  const obj = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_NONE) || []

  return [`get(${obj}, ${path})`, Blockly.JavaScript.ORDER_ATOMIC]
}


/**
 * Object defaultsDeep
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "json_object_merge",
  "message0": "Merge list %1 into %2",
  'style': 'list_blocks',
  "args0": [
    {
      "type": "input_value",
      "name": "DATA"
    },
    {
      "type": "input_value",
      "name": "DEFAULTS"
    }
  ],
  "output": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['json_object_merge'] = function (block) {
  const DATA = Blockly.JavaScript.valueToCode(block, 'DATA', Blockly.JavaScript.ORDER_NONE) || []
  const DEFAULTS = Blockly.JavaScript.valueToCode(block, 'DEFAULTS', Blockly.JavaScript.ORDER_NONE) || []

  return [`merge({}, ${DEFAULTS}, ${DATA})`, Blockly.JavaScript.ORDER_ATOMIC]
}


/**
 * Object.values
 */
Blockly.common.defineBlocksWithJsonArray([{
  "type": "json_object_extract_values",
  "message0": "Extract values: %1",
  'style': 'list_blocks',
  "args0": [
    {
      "type": "input_value",
      "name": "OBJECT"
    }
  ],
  "output": null,
  "tooltip": "",
  "helpUrl": ""
}])

Blockly.JavaScript['json_object_extract_values'] = function (block) {
  const obj = Blockly.JavaScript.valueToCode(block, 'OBJECT', Blockly.JavaScript.ORDER_NONE) || []

  return [`Object.values(${obj})`, Blockly.JavaScript.ORDER_ATOMIC]
}



export default {}
