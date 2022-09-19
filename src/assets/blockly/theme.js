import Blockly from 'blockly'

export default {
  base: Blockly.Theme.Zelos,
  componentStyles: {
    workspaceBackgroundColour: '#2d2b55',
    toolboxBackgroundColour: '#1e1e3f',
    toolboxForegroundColour: '#fad000',
    flyoutBackgroundColour: '#343162', // $black +5%
    flyoutForegroundColour: '#ff0000',
    flyoutOpacity: 1,
    scrollbarColour: '#4f4b94', // $black +25%
    scrollbarOpacity: 1,
    insertionMarkerColour: '#9effff',
    insertionMarkerOpacity: 1,
    markerColour: '#ff0000',
    cursorColour: '#ff0000',
    selectedGlowColour: '#ff0000',
    selectedGlowOpacity: 1,
    replacementGlowColour: '#ff0000',
    replacementGlowOpacity: 1
  },

  categoryStyles: {
    logic_category: {
      colourPrimary: '#ff0000',
    }
  },

  blockStyles: {
    model_blocks: {
      colourPrimary: '#fff',
      colourSecondary: '#ff628c',
      colourTertiary: '#aaa',
    },
    text_blocks: {
      colourPrimary: '#fad000',
      colourSecondary: '#ff628c',
      colourTertiary: '#ffe563'
    },
    math_blocks: {
      colourPrimary: '#FF9D00',
      colourSecondary: '#ff628c',
      colourTertiary: '#ffc466',
    },
    list_blocks: {
      colourPrimary: '#ff628c',
      colourSecondary: '#2ca300',
      colourTertiary: '#ffa1ba'
    },
    logic_blocks: {
      colourPrimary: '#2ca300',
      colourSecondary: '#ff628c',
      colourTertiary: '#67ff2f'
    },
    loop_blocks: {
      colourPrimary: '#5D37F0',
      colourSecondary: '#ff628c',
      colourTertiary: '#ae9bf7',
    },
    variable_blocks: {
    },
    procedure_blocks: {
      colourPrimary: '#9effff',
      colourSecondary: '#ff628c',
      colourTertiary: '#c5ffff'
    },
  }
}
