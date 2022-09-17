<template lang='pug'>
q-page
  .q-pa-md
    .q-gutter-y-md
      q-card
        q-card-section
          q-tabs(v-model='tab' dense='' align='left' narrow-indicator='')
            q-tab(name='Images' label='Quick Prompt')
          q-separator
          //- Images tab
          q-tab-panels(v-model='tab' animated='')
            q-tab-panel(name='Images')
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
                      q-btn.q-ml-md(style='height: 100%' color='negative' width='100px' icon='cancel' label='stop' @click='stopServer(server)' :loading='server.isStopping' :disabled='server.isStopping')

  .q-pa-md
    .q-col-gutter-md.row.items-start
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
/**
 * Props
 */
const queue = $ref([])
const tab = $ref('Images')
const prompt = $ref('')
const negative = $ref('')

// @todo add this to config
const defaultPrompt = $ref('a dr seuss illustration of robots building a city')
// @todo generate and persist this (and do we even need this?)
const sessionHash = $ref('3exs9au2lti')

const lastImg = $ref({})
const imgs = $ref([])
const width = $ref(512)
const height = $ref(512)
const steps = $ref(40)

// milliseconds
const dreamCheckInterval = $ref(750)

const numBatches = $ref(1)
const batchSize = $ref(1)

const totalBatched = $ref(0)

const imageModal = $ref(false)
const imageModalActiveImage = $ref({
  src: '',
  width: 0,
  height: 0,
  server: {
    dream: {}
  }
})
</script>

