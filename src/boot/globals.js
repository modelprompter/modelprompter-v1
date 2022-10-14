import pkg from '../../package.json'
import {get, merge} from 'lodash-es'

export default ({ app }) => {
  // @stuck The assumption is that this is safe to do so long
  // as nothing before this line changes
  console.clear()


  // Skip past blockly label warnings
  // @see https://github.com/google/blockly/issues/4369
  const warn = console.warn
  console.warn = function (str) {
    if (!str.startsWith('No message string for ')) {
      warn(...arguments)
    }
  }


  // Globals for Blockly
  window.get = get
  window.merge = merge


  /**
   * Console Message
   * @todo Make this message configurable in .env for white-labeling
   */
  console.log(`
(∩｀-\´)⊃━🌟☆ﾟ.*･｡ﾟ☆ﾟ. * ･ ｡ﾟ (  MODEL PROMPTER ${pkg.version} ______ _ .  ･  *･｡ﾟ☆ﾟ✨

Join the project: https://github.com/ModelPrompter/modelprompter
Join the Discord: https://discord.gg/SVfTVxT57h
`)
}
