export default ({ app }) => {
  // Skip past blockly label warnings
  // @see https://github.com/google/blockly/issues/4369
  const warn = console.warn
  console.warn = function (str) {
    if (!str.startsWith('No message string for ')) {
      warn(...arguments)
    }
  }
}
