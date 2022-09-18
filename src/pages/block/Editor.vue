<template lang="pug">
q-page
  Blockly(:options='options' ref='foo')
</template>

<script setup>
import Blockly from 'components/Blockly.vue'
import theme from 'assets/blockly-theme.js'

const foo = $ref()
const code = $ref()
const options = {
  media: "media/",
  grid: {
    spacing: 40,
    length: 40,
    colour: "#4f4b94",
    snap: true,
  },
  trashcan: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1,
    maxScale: 3,
    minScale: .3,
    scaleSpeed: 1.2,
    pinch: true
  },
  toolbox: {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Lists',
        contents: [
          {
            kind: 'block',
            type: 'lists_create_empty'
          },
          {
            kind: 'block',
            type: 'lists_repeat'
          },
          {
            kind: 'block',
            type: 'lists_reverse'
          },
          {
            kind: 'block',
            type: 'lists_isEmpty'
          },
          {
            kind: 'block',
            type: 'lists_length'
          },
          {
            kind: 'block',
            type: 'lists_create_with'
          },
          {
            kind: 'block',
            type: 'lists_create_with_container'
          },
          {
            kind: 'block',
            type: 'lists_create_with_item'
          },
          {
            kind: 'block',
            type: 'lists_indexOf'
          },
          {
            kind: 'block',
            type: 'lists_getIndex'
          },
          {
            kind: 'block',
            type: 'lists_setIndex'
          },
          {
            kind: 'block',
            type: 'lists_getSublist'
          },
          {
            kind: 'block',
            type: 'lists_sort'
          },
          {
            kind: 'block',
            type: 'lists_split'
          },
          {
            kind: 'block',
            type: 'lists_create_with'
          },
          {
            kind: 'block',
            type: 'lists_create_with_container'
          },
          {
            kind: 'block',
            type: 'lists_create_with_item'
          },
          {
            kind: 'block',
            type: 'lists_indexOf'
          },
          {
            kind: 'block',
            type: 'lists_getIndex'
          },
          {
            kind: 'block',
            type: 'lists_setIndex'
          },
          {
            kind: 'block',
            type: 'lists_getSublist'
          },
          {
            kind: 'block',
            type: 'lists_sort'
          },
          {
            kind: 'block',
            type: 'lists_split'
          },
        ]
      },
      {
        kind: 'category',
        name: 'Logic',
        contents: [
          {
            kind: 'block',
            type: 'logic_boolean'
          },
          {
            kind: 'block',
            type: 'controls_if'
          },
          {
            kind: 'block',
            type: 'controls_ifelse'
          },
          {
            kind: 'block',
            type: 'logic_compare'
          },
          {
            kind: 'block',
            type: 'logic_operation'
          },
          {
            kind: 'block',
            type: 'logic_negate'
          },
          {
            kind: 'block',
            type: 'logic_null'
          },
          {
            kind: 'block',
            type: 'logic_ternary'
          },
          {
            kind: 'block',
            type: 'controls_if_if'
          },
          {
            kind: 'block',
            type: 'controls_if_elseif'
          },
          {
            kind: 'block',
            type: 'controls_if_else'
          },
        ]
      },
      {
        kind: 'category',
        name: 'Loops',
        contents: [
          {
            kind: 'block',
            type: 'controls_repeat_ext'
          },
          {
            kind: 'block',
            type: 'controls_repeat'
          },
          {
            kind: 'block',
            type: 'controls_whileUntil'
          },
          {
            kind: 'block',
            type: 'controls_for'
          },
          {
            kind: 'block',
            type: 'controls_forEach'
          },
          {
            kind: 'block',
            type: 'controls_flow_statements'
          },
        ]
      }
    ]
  },
  theme
}
</script>

