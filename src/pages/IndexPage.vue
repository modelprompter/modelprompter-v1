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
            img(style='height: 300px')
            div
              strong.q-mr-sm 🧩 Try it:
              | Lexica quick search 🧩
          q-card-section
            p The blocks above will load 50 images and prompts from <a href="https://lexica.art">Lexica.art</a> and display them in a grid for further exploration.
            div.q-mb-sm
              q-btn.full-width Run blocks above
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
