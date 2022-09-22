<template lang="pug">
.blockly-container
  .blockly(ref='blockly')
    q-resize-observer(@resize='resize')
  .hidden(ref='blocklyToolbox')
    slot
</template>

<script setup>
import Blockly from 'blockly'
import {onMounted, shallowRef, inject} from 'vue'
import Interpreter from 'js-interpreter'

const $bus = inject('$bus')
const props = defineProps(['options', 'loadData'])
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()
let interpreter = shallowRef()
let code = $ref('')

const emit = defineEmits(['change'])

/**
 * Mount
 */
onMounted(() => {
  const options = props.options || {}
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox
  }
  workspace = Blockly.inject(blockly, options)
  workspace.addChangeListener(onChange)

  // Add class names to blocks
  // @see https://groups.google.com/g/blockly/c/SwGzTvSo1H8/m/LjIRnlXbDAAJ
  Object.keys(Blockly.Blocks).forEach((blockId) => {
    const block = Blockly.Blocks[blockId]
    if (block.init) {
      const oldInit = block.init
      block.init = function() {
        if (oldInit) oldInit.call(this)
        // create whatever class name you want, assuming you want a different one for each type of block
        const className = `blockly-block-${blockId} blockly-category-${this.styleName_}`
        // This adds a class to the whole block, you'd have to use the right css selector to grab .blocklyText that is a descendant of this class
        Blockly.utils.dom.addClass(this.getSvgRoot(), className)
      }
    }
  })
})


/**
 * Load initial data
 */
const load = function (data) {
  if (data) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(data),
      workspace
    )
  } else {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>'),
      workspace
    )
  }
}



/**
 * Gets the Blockly workspace as a string for saving
 * @return the current workspace string
 */
const getWorkspaceString = function (data) {
  return Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))
}




/**
 * Emits the workspace and triggers an autosave in the component above
 */
function onChange (ev) {
  emit('change', ev, workspace)
}




/**
 * Handle resize event
 */
function resize () {
  Blockly.svgResize(workspace)
}





/**
 * Run the code and setup the API
 * @todo move the API into a separate folder
 */
$bus.on('page.editor.runBlocks', () => {
  code = Blockly.JavaScript.workspaceToCode(workspace)

  interpreter = new Interpreter(code, (acorn, globalObj) => {
    /**
     * Send a POST message
     */
    acorn.setProperty(globalObj, 'serverMessagePost', acorn.createNativeFunction(function () {
      console.log('serverMessagePost', arguments)
    }))

    /**
     * Send data to the feed
     */
    acorn.setProperty(globalObj, 'feedSendData', acorn.createNativeFunction(function () {
      console.log('feedSendData', arguments)
    }))
  })

  interpreter.run()
})



/**
 * Final stuff
 */
defineExpose({workspace, getWorkspaceString, load, code})
</script>

<style scoped>
.blockly-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: left;
}
.blockly, .blockly svg {
  width: 100%;
  height: 100%;
}
</style>
