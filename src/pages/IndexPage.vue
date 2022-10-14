<template lang="pug">
q-page
  .content
    .row.flex
      .col
        q-card.q-mb-lg.bg-blue
          q-card-section
            div 📅 Hi, thanks for visiting! This project is still an early prototype; lots of examples and documentation coming soon!
            //- div
            //-   strong.q-mr-md Links:
            //-   a(href='https://github.com/ModelPrompter/modelprompter') GitHub
            //-   span.q-mx-sm ·
            //-   a(href='https://twitter.com/ModelPrompter') Twitter
    .row.flex.q-gutter-md
      .col.col-md-6
        q-card
          .text-center
            img(alt='Model Prompter' src='~assets/favicon.png' style='width: 300px; height: 300px')
            div
              strong 🔔 This is still a prototype 🔔
          q-card-section
            p Use programmable blocks to automate prompts to Stable Diffusion, Colab Notebooks, bots, webhooks, and any other API on the web.
            p.q-mt-sm.text-center
              a(href='https://github.com/ModelPrompter/modelprompter') GitHub
              span.q-mx-sm ·
              a(href='https://twitter.com/ModelPrompter') Twitter

      .col.col-md-6
        q-card
          .text-center
            div(style='height: 290px; position: relative')
              BlocklyWorkspace(:hideToolbox='true' workspaceID='1b8c46a7-145a-4d23-b076-4d8538afe220' :options='{trashcan: false, zoom: {controls: false}}')
            div.q-mt-md
              strong.q-mr-sm 🧩 Try it:
              | Lexica quick search 🧩
          q-card-section
            p The blocks above will load 50 images and prompts from <a href="https://lexica.art">Lexica.art</a> and display them in a grid for further exploration.
            div.q-mb-sm
              BlocklyToggle.full-width
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import BlocklyToggle from 'src/components/BlocklyToggle.vue'

function runDemo () {
  console.log('test')
}
</script>
