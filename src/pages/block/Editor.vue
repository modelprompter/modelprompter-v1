<template lang="pug">
q-page
  Blockly(:options='options' ref='foo')
    block(type='controls_ifelse')
    block(type='logic_compare')
    block(type='logic_operation')
    block(type='controls_repeat_ext')
      value(name='TIMES')
        shadow(type='math_number')
          field(name='NUM') 10
    block(type='logic_operation')
    block(type='logic_negate')
    block(type='logic_boolean')
    block(type='logic_null' disabled='true')
    block(type='logic_ternary')
    block(type='text_charAt')
      value(name='VALUE')
        block(type='variables_get')
          field(name='VAR') text

</template>

<script setup>
import Blockly from 'components/Blockly.vue'

const foo = $ref()
const code = $ref()
const options = {
  media: "media/",
  grid: {
    spacing: 25,
    length: 3,
    colour: "#ccc",
    snap: true,
  },
}
</script>

