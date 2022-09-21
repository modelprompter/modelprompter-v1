// @see https://github.com/quasarframework/quasar/discussions/9220#discussioncomment-720013
import emitter from 'tiny-emitter/instance'

export default ({ app }) => {
  app.provide('$bus', {
    on: (...args) => emitter.on(...args),
    once: (...args) => emitter.once(...args),
    off: (...args) => emitter.off(...args),
    emit: (...args) => emitter.emit(...args)
  })
}
