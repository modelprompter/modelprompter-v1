<template lang="pug">
q-tab-panel(name='')
  //- @todo Add random placeholders
  div
    q-input(v-model='prompt' label='Prompt' placeholder='a dr seuss illustration of robots building a city' autogrow @change='autosave')
      template(v-if='$q.screen.gt.xs' v-slot:append='')
        q-btn(color='primary' label='Dream' icon='bubble_chart' :disabled='isWakingUp' @click='queueDream')
        q-btn.q-ml-md(v-if='isDreaming' icon='stop' color='red' label='Stop All' @click='stopAll')
    q-btn.full-width.q-mt-md(v-if='$q.screen.lt.sm' color='primary' label='Dream' icon='bubble_chart' :disabled='isWakingUp' @click='queueDream')
  template(v-for='server in servers')
    template(v-if='server.isChecking || server.isDreaming || server.isWakingUp || server.isStopping')
      .flex.q-mt-md
        div
          q-linear-progress(style='flex: 1' dense color='blue' size='20px' :value='+(server.dreamProgress)/100' stripe='')
            span(style='position: absolute; width: 100%; text-align: center; color: #fff; display: block; font-size: .65em') {{server.base}}
          q-linear-progress.q-mt-sm(color='negative' size='10px' :value='servers.length/(servers.length+queue.length)')
            span(style='position: absolute; width: 100%; text-align: center; color: #fff; display: block; font-size: .8em')
        div(style='flex: 0 0 120px')
          q-btn.q-ml-md(style='height: 100%' color='negative' width='100px' icon='cancel' label='stop' @click='stopServer(server)')

  .q-mt-lg.q-col-gutter-md.row.items-start
    //- Config
    .col-xs-12.col-sm-6.col-md-4
      q-card
        q-card-section
          //- Basics
          q-badge Steps: {{ steps }}
          q-slider(v-model='steps' :min='1' :max='150' :step='1' @change='autosave')
          q-badge Width: {{ width }}
          q-slider(v-model='width' :min='64' :max='2048' :step='64' @change='autosave' snap='')
          q-badge Height: {{ height }}
          q-slider(v-model='height' :min='64' :max='2048' :step='64' @change='autosave' snap='')
          //- Batches
          q-badge Batch Size: {{ batchSize }}
          q-input(dense='' type='number' min='1' v-model.number='batchSize' @change='autosave')
    //- Gallery
    .col-xs-12.col-sm-6.col-md-8
      .q-col-gutter-md.row.items-start
        .col-xs-12.col-sm-6.col-md-4.col-lg-3(v-for='(img, key) in imgs' :key='key')
          q-card.cursor-pointer(@click='expandImage(img)')
            q-card-section.q-pa-sm
              q-img(native-context-menu :src='img.src')
            q-card-actions(align='right')
              q-btn(flat round color='negative' icon='delete' @click='deleteImage($event, img)')
              q-space
              q-btn(flat round color='secondary' icon='save' @click='downloadImage($event, img)')

  //- Image Modal
  q-dialog(v-model='imageModal')
    q-card(style='min-width: 300px')
      q-img(native-context-menu :src='imageModalActiveImage.src' :style='{width: imageModalActiveImage.width, height: imageModalActiveImage.height}')
      q-card-section
        pre(style='font-size:1.15em') {{imageModalActiveImage.server.dream.prompt}}
        table
          tr
            td width
            td {{imageModalActiveImage.width}}px
          tr
            td height
            td {{imageModalActiveImage.height}}px
          tr
            td steps
            td {{imageModalActiveImage.server.dream.steps}}
      q-card-actions(align='right')
          q-btn(flat round color='negative' icon='delete' @click='deleteImage($event, imageModalActiveImage)')
          q-space
          q-btn(flat round color='secondary' icon='save' @click='downloadImage($event, imageModalActiveImage)')
</template>

<script setup>
import {useSettingsStore} from '../../stores/settings'
import {useQuasar} from 'quasar'
import axios from 'axios'
import {cloneDeep} from 'lodash-es'
import {LocalStorage, uid, Notify} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {nextTick, getCurrentInstance} from 'vue'

const $q = useQuasar()
const settings = useSettingsStore()
const router = useRouter()
const route = useRoute()
const instance = getCurrentInstance()







/**
 * Props
 */
const localData = LocalStorage.getItem('quickprompt') || {}

const queue = $ref(localData.queue || [])
const prompt = $ref(localData.prompt || '')
const negative = $ref(localData.negative || '')

// @todo add this to config
const defaultPrompt = $ref(localData.defaultPrompt || 'a dr seuss illustration of robots building a city')
// @todo generate and persist this (and do we even need this?)
const sessionHash = $ref(localData.sessionHash || '3exs9au2lti')

const lastImg = $ref(localData.lastImg || {})
const imgs = $ref(localData.imgs || [])
const width = $ref(localData.width || 512)
const height = $ref(localData.height || 512)
const steps = $ref(localData.steps || 40)

// milliseconds
const dreamCheckInterval = $ref(localData.dreamCheckInterval || 750)

const numBatches = $ref(localData.numBatches || 1)
const batchSize = $ref(localData.batchSize || 1)
const totalBatched = $ref(localData.totalBatched || 0)

const imageModal = $ref(localData.imageModal || false)
const imageModalActiveImage = $ref(localData.imageModalActiveImage || {
  src: '',
  width: 0,
  height: 0,
  server: {
    dream: {}
  }
})





/**
 * Setup last image on load
 */
if (lastImg) {
  imgs.push(lastImg)
}









/**
 * Computed
 */
const servers = $computed(() => settings.servers.filter(server => server.enabled))

const isDreaming = $computed(() => {
  return servers.some(server => server.isDreaming)
})

const isWakingUp = $computed(() => {
  return servers.some(server => server.isWakingUp)
})

// @todo this smells like gefilte fish
const overallProgress = $computed(() => {
  if (!queue.length) {
    return 1
  } else {
    return servers.length / queue.length
  }
})






/**
 * Ping all enabled servers
 */
// Let's ping all servers on load to get current status
if (servers.length) {
  servers.forEach(server => {
    // Let's force-start checking
    server.isChecking = false

    // @todo Use a method instead of axios.create directly incase of update
    const api = axios.create({baseURL: server.base})
    checkDream(server, api)
  })
} else {
  Notify.create({
    color: 'negative',
    position: 'top',
    multiLine: true,
    message: `No GPUs are enabled.`,
    actions: [
      {
        label: 'Enable GPUs',
        color: 'white',
        handler: () => {
          router.push({path: '/quick/gpus'})
        }
      }
    ],
    icon: 'report_problem',
  })
}







/**
 *
 */
function getQueueData () {
  const data = {
    prompt,
    negative,
    sessionHash,
    width,
    height,
    steps,
    numBatches,
    batchSize,
    defaultPrompt
  }

  return data
}

/**
 * Queues up the dream and runs them if able to
 */
function queueDream () {
  // Exit if no servers
  if (!servers.length) {
    Notify.create({
      message: 'No GPUs enabled.',
      position: 'top',
      color: 'red',
      multiline: true,
      actions: [
        {
          label: 'Enable GPUs',
          color: 'white',
          handler: () => {
            $router.push({path: '/quick/gpus'})
          }
        }
      ],
    })
    return
  }

  // Create the batch
  const batch = []
  for (let i = 0; i < batchSize; i++) {
    batch.push(getQueueData())
  }
  queue.push(...batch)

  // Check and start the next dream
  servers.forEach(server => {
    if (!server.isChecking) {
      // Loop through each server and try to find an available one to run
      const api = axios.create({ baseURL: server.base })

      server.isChecking = true
      checkDream(server, api)
    }
  })

  // Save the queue to localstorage
  autosave()
}

/**
 * Check dream
 */
function checkDream (server, api) {
  api
  .post('/api/predict', {
    fn_index: 4,
    data: [],
    session_hash: 'wnjumdy1m18',
  })
  .then((response) => {
    const data = response.data.data[0]
    server.lastResponse = data

    // Pick up from where we left off
    if (data) {
      server.isDreaming = true
      server.isChecking = true
    } else {
      server.isDreaming = false
      server.isStopping = false
    }
    // console.log('isChecking', server.base, response.data.data[0])

    // If we're dreaming, update the progress
    // @todo handle multiple dreams
    if (data) {
      // Create a dummy DOM to extract the progress
      const $dom = document.createElement('div')
      $dom.innerHTML = data
      const $width = $dom.querySelector('.progress')

      // Update progress in UI
      if ($width) {
        server.dreamProgress = parseInt($width.style.width.replace('%', ''))
      } else {
        server.dreamProgress = 0
      }

      // Check the dream again
      if (server.dreamProgress < 100) {
        setTimeout(() => {
          checkDream(server, api)
        }, dreamCheckInterval)
      } else {
        wakeUp(server, api)
      }

      // Update UI
      nextTick(() => {
        instance?.proxy?.$forceUpdate()
      })
    // Otherwise start dreaming if not dreaming
    } else if (!server.isDreaming) {
      startDream(server, api)
    }
  })
  .catch(err => {
    Notify.create({
      color: 'negative',
      position: 'top',
      multiLine: true,
      message: `${server.base} -- ${err}`,
      actions: [
        {
          label: 'Check GPUs',
          color: 'white',
          handler: () => {
            router.push({path: '/quick/gpus'})
          }
        }
      ],
      icon: 'report_problem',
    })
    server.isDreaming = false
    server.isChecking = false
    console.log(err)
  })
}

/**
 * Starts the dream and occasionally checks in to update progress
 */
function startDream (server, api) {
  if (!queue.length) {
    wakeUp(server, api)
    return
  }

  // Start checking for progress
  server.isDreaming = true
  server.isChecking = true
  server.dreamProgress = 0
  nextTick(() => {
    instance?.proxy?.$forceUpdate()

    setTimeout(() => {
      checkDream(server, api)
    }, dreamCheckInterval)
  })

  // Actuall start dream
  const dream = queue.shift()
  dream.prompt = dream.prompt || dream.defaultPrompt
  server.dream = dream
  const $server = cloneDeep(server)

  api
    .post('/api/predict', {
      fn_index: 3,
      data: prepareData($server.dream, $server),
      session_hash: 'wnjumdy1m18',
    })
    .then((response) => {
      // Clean data
      const data = []
      response.data.data.forEach((val) => {
        data.push(val)
      })

      // Gets the image size and adds it to the queue
      if (data[0]) {
        const _imgs = []
        data[0].forEach(img => {
          const $img = new Image()
          img = {
            src: img,
            width: 0,
            height: 0,
            id: uid()
          }
          img.server = Object.assign({}, $server)

          // Load the image to get the dimensions
          $img.onload = () => {
            img.width = $img.width
            img.height = $img.height
            $img.remove()
          }
          $img.src = img.src

          _imgs.unshift(img)
        })

        imgs.unshift(..._imgs)
        lastImg = imgs[imgs.length-1]
      } else {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: `${$server.base} -- No images generated`,
          icon: 'report_problem'
        })
      }

      // Run next in queue
      wakeUp($server, api)
      if (queue.length) {
        startDream($server, api)
      }
    })
    .catch((err) => {
      Notify.create({
        color: 'negative',
        position: 'top',
        multiline: true,
        message: `${$server.base} -- Prompting failed: ${err}`,
        icon: 'report_problem',
        actions: [
          {
            label: 'Check server API',
            color: 'white',
            handler: () => {
              $router.push({path: '/quick/gpus'})
            }
          }
        ],
      })
      console.log(err)
    })
}

/**
 * Frees up local data and allows the server to be pinged again
 */
function wakeUp (server, api) {
  server.isChecking = false
  server.isDreaming = false
  server.dream = {}

  nextTick(() => {
    instance?.proxy?.$forceUpdate()
  })
}

function stopServer (server) {
  const api = axios.create({baseURL: server.base})
  server.isStopping = true

  api
    .post('/api/predict', {
      fn_index: 5,
    })
    .finally(() => {
      server.isStopping = false
    })
    .catch((err) => {
      Notify.create({
        color: 'negative',
        position: 'top',
        message: `${server.base} -- Stopping txt2Img failed: ${err}`,
        icon: 'report_problem',
      })
    })
}

// @todo Add this as a generic prototype
// @todo Let's revisit how we save after vuex upgrade
// @todo 🚨 This should be throttled
function autosave () {
  const data = {
    // 'imgs', // Only during testing!
    queue,
    prompt,
    sessionHash,
    lastImg,
    width,
    height,
    steps,
    batchSize
  }

  LocalStorage.set('quickprompt', data)
}

function expandImage (ev) {
  imageModal = true
  imageModalActiveImage = ev
}

/**
 * Converts data into a format for specific Stable Diffusion apis
 */
function prepareData (context, server) {
  let data, promptDictionary, defaults

  // Select statement based on data api
  switch (server.api || '1') {
    // @see https://github.com/AUTOMATIC1111/stable-diffusion-webui
    case 'AUTOMATIC1111-1':
      data = []
      promptDictionary = ['prompt', 'negative', '', 'steps', '', '', '', '', '', '', '', '', '', '', '', 'height', 'width', '', '', '', '', '', '', '', '']
      // promptDictionary = ['prompt', 'negative', '', 'steps', '', '', '', 'numBatches', 'batchSize', '', '', '', '', '', '', 'height', 'width', '', '', '', '', '', '', '', '']
      defaults = [context.defaultPrompt, '', 'None', 40, 'Euler a', false, false, 1, 1, 7, -1, -1, 0, 0, 0, context.height, context.width, 'None', null, 'Seed', '', 'Steps', '', false, []]

      // Build the data fro the given dictionary and defaults
      promptDictionary.forEach((key, n) => {
        if (key) {
          data.push(context[key] || defaults[n])
        } else {
          data.push(defaults[n])
        }
      })
    break

    // @see https://github.com/AUTOMATIC1111/stable-diffusion-webui
    case 'AUTOMATIC1111-2':
      data = []
      promptDictionary = ['prompt', 'negative', '', '', 'steps', '', '', '', '', '', '', '', '', '', '', '', 'height', 'width', '', '', '', '', '', '', '', '', '']
      // promptDictionary = ['prompt', 'negative', '', 'steps', '', '', '', 'numBatches', 'batchSize', '', '', '', '', '', '', 'height', 'width', '', '', '', '', '', '', '', '']
      defaults = [context.defaultPrompt, '', 'None', 'None', 40, 'Euler a', false, false, 1, 1, 7, -1, -1, 0, 0, 0, context.height, context.width, 'None', false, 'Seed', '', 'Steps', '', true, null, [], '', '']

      // Build the data fro the given dictionary and defaults
      promptDictionary.forEach((key, n) => {
        if (key) {
          data.push(context[key] || defaults[n])
        } else {
          data.push(defaults[n])
        }
      })
    break
  }

  return data
}

/**
 * Stopp all servers and clear the queue
 */
function stopAll () {
  servers.forEach(server => {
    stopServer(server)
  })
  queue = []
  autosave()
}

/**
 * Deletes image (and attempts to cancel the click event)
 */
function deleteImage (ev, img) {
  ev.stopPropagation()

  let idxToRemove = 0
  imageModal = false
  imgs.find((i, n) => {
    const isImg = i.id === img.id
    idxToRemove = n
    return isImg
  })

  imgs.splice(idxToRemove, 1)

  autosave()
}

/**
 * Downloads the image as PNG
 * @param {*} ev
 * @param {*} img
 */
function downloadImage (ev, img) {
  ev.stopPropagation()

  const a = document.createElement('a')
  a.href = img.src

  let filename = img.server.dream.prompt.substr(0, 300)
  filename = filename.replace(/\s/g, '_')
  filename = filename.replace(/\W/g, '')

  const date = new Date()
    .getFullYear()
      + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
      + '-' + ('0' + new Date().getDate()).slice(-2)

  a.download = `${date + '---' + filename}.png`
  a.click()

  nextTick(() => {
    a.remove()
  })
}
</script>
