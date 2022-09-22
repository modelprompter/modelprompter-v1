export default ({ app }) => {
  const warn = console.warn
  console.warn = function (str) {
    if (!str.startsWith('No message string for ')) {
      warn(...arguments)
    }
  }
}
