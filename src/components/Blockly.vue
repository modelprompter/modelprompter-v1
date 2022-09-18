<template lang="pug">
.blockly-container
  .blockly(ref='blockly')
  .hidden(ref='blocklyToolbox')
    slot
      //- category(name='Colour' categorystyle='colour_category')
      block(type='colour_picker')
      //- category(name='Logic' categorystyle='logic_category')
      //-   block(type='controls_if')
      //-   block(type='logic_compare')
      //-   block(type='logic_operation')
      //-   block(type='logic_negate')
      //-   block(type='logic_boolean')
      //-   block(type='logic_null' disabled='true')
      //-   block(type='logic_ternary')
      //- category(name='Loops' categorystyle='loop_category')
      //-   block(type='controls_repeat_ext')
      //-     value(name='TIMES')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 10
      //-   block(type='controls_repeat' disabled='true')
      //-   block(type='controls_whileUntil')
      //-   block(type='controls_for')
      //-     value(name='FROM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-     value(name='TO')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 10
      //-     value(name='BY')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-   block(type='controls_forEach')
      //-   block(type='controls_flow_statements')
      //- category(name='Math' categorystyle='math_category')
      //-   block(type='math_number' gap='32')
      //-     field(name='NUM') 123
      //-   block(type='math_arithmetic')
      //-     value(name='A')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-     value(name='B')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-   block(type='math_single')
      //-     value(name='NUM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 9
      //-   block(type='math_trig')
      //-     value(name='NUM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 45
      //-   block(type='math_constant')
      //-   block(type='math_number_property')
      //-     value(name='NUMBER_TO_CHECK')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 0
      //-   block(type='math_round')
      //-     value(name='NUM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 3.1
      //-   block(type='math_on_list')
      //-   block(type='math_modulo')
      //-     value(name='DIVIDEND')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 64
      //-     value(name='DIVISOR')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 10
      //-   block(type='math_constrain')
      //-     value(name='VALUE')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 50
      //-     value(name='LOW')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-     value(name='HIGH')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 100
      //-   block(type='math_random_int')
      //-     value(name='FROM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-     value(name='TO')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 100
      //-   block(type='math_random_float')
      //-   block(type='math_atan2')
      //-     value(name='X')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //-     value(name='Y')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 1
      //- category(name='Text' categorystyle='text_category')
      //-   block(type='text')
      //-   block(type='text_multiline')
      //-   block(type='text_join')
      //-   block(type='text_append')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-   block(type='text_length')
      //-     value(name='VALUE')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //-   block(type='text_isEmpty')
      //-     value(name='VALUE')
      //-       shadow(type='text')
      //-         field(name='TEXT')
      //-   block(type='text_indexOf')
      //-     value(name='VALUE')
      //-       block(type='variables_get')
      //-         field(name='VAR') text
      //-     value(name='FIND')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //-   block(type='text_charAt')
      //-     value(name='VALUE')
      //-       block(type='variables_get')
      //-         field(name='VAR') text
      //-   block(type='text_getSubstring')
      //-     value(name='STRING')
      //-       block(type='variables_get')
      //-         field(name='VAR') text
      //-   block(type='text_changeCase')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //-   block(type='text_trim')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //-   block(type='text_count')
      //-     value(name='SUB')
      //-       shadow(type='text')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-   block(type='text_replace')
      //-     value(name='FROM')
      //-       shadow(type='text')
      //-     value(name='TO')
      //-       shadow(type='text')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-   block(type='text_reverse')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-   label(text='Input/Output:' web-class='ioLabel')
      //-   block(type='text_print')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //-   block(type='text_prompt_ext')
      //-     value(name='TEXT')
      //-       shadow(type='text')
      //-         field(name='TEXT') abc
      //- category(name='Lists' categorystyle='list_category')
      //-   block(type='lists_create_with')
      //-     mutation(items='0')
      //-   block(type='lists_create_with')
      //-   block(type='lists_repeat')
      //-     value(name='NUM')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 5
      //-   block(type='lists_length')
      //-   block(type='lists_isEmpty')
      //-   block(type='lists_indexOf')
      //-     value(name='VALUE')
      //-       block(type='variables_get')
      //-         field(name='VAR') list
      //-   block(type='lists_getIndex')
      //-     value(name='VALUE')
      //-       block(type='variables_get')
      //-         field(name='VAR') list
      //-   block(type='lists_setIndex')
      //-     value(name='LIST')
      //-       block(type='variables_get')
      //-         field(name='VAR') list
      //-   block(type='lists_getSublist')
      //-     value(name='LIST')
      //-       block(type='variables_get')
      //-         field(name='VAR') list
      //-   block(type='lists_split')
      //-     value(name='DELIM')
      //-       shadow(type='text')
      //-         field(name='TEXT') ,
      //-   block(type='lists_sort')
      //-   block(type='lists_reverse')
      //- category(name='Colour' categorystyle='colour_category')
      //-   block(type='colour_picker')
      //-   block(type='colour_random')
      //-   block(type='colour_rgb')
      //-     value(name='RED')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 100
      //-     value(name='GREEN')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 50
      //-     value(name='BLUE')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 0
      //-   block(type='colour_blend')
      //-     value(name='COLOUR1')
      //-       shadow(type='colour_picker')
      //-         field(name='COLOUR') #ff0000
      //-     value(name='COLOUR2')
      //-       shadow(type='colour_picker')
      //-         field(name='COLOUR') #3333ff
      //-     value(name='RATIO')
      //-       shadow(type='math_number')
      //-         field(name='NUM') 0.5
      //- sep
      //- category(name='Variables' categorystyle='variable_category' custom='VARIABLE')
      //- category(name='Functions' categorystyle='procedure_category' custom='PROCEDURE')

</template>

<script setup>
import Blockly from 'blockly'
import {onMounted, shallowRef} from 'vue'

const props = defineProps(['options'])
const blocklyToolbox = $ref()
const blockly = $ref()
let workspace = shallowRef()

defineExpose({workspace})

onMounted(() => {
  const options = props.options || {}
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox
  }
  workspace = Blockly.inject(blockly, options)
})
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
