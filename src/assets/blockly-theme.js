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
    logic_blocks: {
      colourPrimary: '#5D37F0',
      colourSecondary: '#ff0000',
      colourTertiary: '#ae9bf7'
    }
  }
}
