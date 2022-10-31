// Adds Plausible Analytics during production builds
// @see .env
export default ({ app }) => {
  if (process.env.PROD) {
    const $script = document.createElement('script')
    $script.src = 'https://plausible.io/js/plausible.js'
    $script.async = true
    $script.defer = true
    document.body.appendChild($script)
  }
}
