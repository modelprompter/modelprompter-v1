import Blockly from 'blockly'

export default {
  base: Blockly.Theme.Zelos,
  startHats: true,
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
    red: {
      colourPrimary: '#ff628c',
      colourSecondary: '#ff1b58',
      colourTertiary: '#ffa1ba'
    },
    orange: {
      colourPrimary: '#FF9D00',
      colourSecondary: '#cc7e00',
      colourTertiary: '#ffc466',
      hat: 'cap'
    },
    yellow: {
      colourPrimary: '#fad000',
      colourSecondary: '#c8a600',
      colourTertiary: '#ffe563'
    },
    green: {
      colourPrimary: '#2ca300',
      colourSecondary: '#238200',
      colourTertiary: '#67ff2f'
    },
    ice_blue: {
      colourPrimary: '#9effff',
      colourSecondary: '#4bffff',
      colourTertiary: '#c5ffff'
    },
    purple: {
      colourPrimary: '#5D37F0',
      colourSecondary: '#3a10dc',
      colourTertiary: '#ae9bf7',
    },
    white: {
      colourPrimary: '#fff',
      colourSecondary: '#ccc',
      colourTertiary: '#aaa',
    },
    pink: {
      colourPrimary: '#FB94FF',
      colourSecondary: '#f843ff',
      colourTertiary: '#fdd4ff',
    },

    event_blocks: {
      colourPrimary: '#FF9D00',
      colourSecondary: '#cc7e00',
      colourTertiary: '#ffc466',
      hat: 'cap'
    },
    api_blocks: {
      colourPrimary: '#fff',
      colourSecondary: '#ccc',
      colourTertiary: '#aaa',
    },
    text_blocks: {
      colourPrimary: '#fad000',
      colourSecondary: '#c8a600',
      colourTertiary: '#ffe563'
    },
    math_blocks: {
      colourPrimary: '#9effff',
      colourSecondary: '#4bffff',
      colourTertiary: '#c5ffff'
    },
    list_blocks: {
      colourPrimary: '#FB94FF',
      colourSecondary: '#f843ff',
      colourTertiary: '#fdd4ff',
    },
    logic_blocks: {
      colourPrimary: '#2ca300',
      colourSecondary: '#238200',
      colourTertiary: '#67ff2f'
    },
    loop_blocks: {
      colourPrimary: '#5D37F0',
      colourSecondary: '#3a10dc',
      colourTertiary: '#ae9bf7',
    },
    variable_blocks: {
      colourPrimary: '#ff628c',
      colourSecondary: '#ff1b58',
      colourTertiary: '#ffa1ba'
    },
    procedure_blocks: {
      colourPrimary: '#FF9D00',
      colourSecondary: '#cc7e00',
      colourTertiary: '#ffc466',
      hat: 'none'
    },
  }
}
