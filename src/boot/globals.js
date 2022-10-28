import pkg from '../../package.json'
import {get, merge} from 'lodash-es'
import {LocalStorage} from 'quasar'

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
  globalThis.get = get
  globalThis.merge = merge

  // Other globals
  globalThis.LocalStorage = LocalStorage


  /**
   * Console Message
   * @todo Make this message configurable in .env for white-labeling
   */
  console.log(`
(∩｀-\´)⊃━🌟☆ﾟ.*･｡ﾟ☆ﾟ. * ･ ｡ﾟ (  MODEL PROMPTER ${pkg.version} ______ _ .  ･  *･｡ﾟ☆ﾟ✨

Follow the project on Twitter: https:/twitter.com/ModelPrompter
Get the source code on GitHub: https://github.com/ModelPrompter/ModelPrompter
Join the Discord: https://discord.gg/GFJ2ftEQWF
`)
}
