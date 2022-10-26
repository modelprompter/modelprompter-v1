<template lang="pug">
q-page
  .content
    section
      .row.flex
        .col
          q-card.q-mb-lg.bg-blue
            q-card-section
              div 📅 <strong>22-10-25</strong> - Hi, thanks for visiting! This project is still a <strong>super early prototype</strong>; it's buggy but in <a href="https://github.com/modelprompter/modelprompter">active development</a>!

      .row.q-col-gutter-md
        .q-mb-md.col-xs-12.col-md-6
          q-card
            .text-center
              div.gt-md(style='padding: 120px 20px; padding-bottom: 120px')
                img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')
              div.lt-md(style='padding: 20px; padding-bottom: 20px')
                img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')

              div.text-h5
                strong.text-white Automate AI's and API's
            q-card-section
              p Use programmable blocks to automate prompts to Stable Diffusion, Colab Notebooks, bots, webhooks, and any API. <strong>Then use more blocks to configure how the data is organized and displayed!</strong>
              p.q-mt-sm.text-center
                a(href='https://github.com/ModelPrompter/modelprompter') GitHub
                span.q-mx-sm ·
                a(href='https://twitter.com/ModelPrompter') Twitter
                span.q-mx-sm ·
                a(href='https://discord.gg/GFJ2ftEQWF') Discord

        .col-12.col-md-6
          q-card
            .text-center
              div(style='height: 290px; position: relative')
                BlocklyWorkspace(ref='workspace1' @onIsRunning='updateButton("workspaceBtn1", $event)' workspaceID='a0352aba-3515-4e98-871c-fcf48b853a8f' :options='{trashcan: false}' static)
              div.q-mt-md
                div.text-h5
                  strong.text-white Try it!
            q-card-section
              p The blocks above will load 50 images and prompts from <a href="https://lexica.art">Lexica.art</a> and display them in a grid. <strong>Try editing the prompt and pressing "Run Blocks" below to view the data feed.</strong>
              div.q-mb-sm
                BlocklyToggle.full-width(ref='workspaceBtn1' target='workspace1' @toggled='toggleWorkspace')

    section
      q-card.q-mb-xl
        q-card-section
          .row.q-col-gutter-md
            .col-12.col-md-4
              h2.q-mt-none Imagine words as blocks
              p Explore lots of ideas at once by generating dynamic prompts that change with each run or adapt to events.
              div.q-mt-xl
                BlocklyToggle.full-width(ref='workspaceBtn2' target='workspace2' @toggled='toggleWorkspace')
            .col-12.col-md-8
              .relative(style='height: 350px;')
                BlocklyWorkspace(ref='workspace2' @onIsRunning='updateButton("workspaceBtn2", $event)' workspaceID='e0ebb972-48ef-4e3e-92cc-89efa1d2deda' :options='{trashcan: false}' static)

    section
      q-card.q-mb-xl
        q-card-section
          .row.q-col-gutter-md
            .col-12.col-md-6
              h2.q-mt-none Interact with APIs and URLs
              p Use data from any source you have access to, like Google Sheets, Notion Databases, Wikipedia, Twitter, or any other API on the web. <strong>With the Model Prompter client (coming soon), you'll even be able to use cURL to scrape any URL whether it has an API or not!</strong>
              p Here we load a random topic title from Wikipedia and use it to prompt for 50 images from Lexica.
              div.q-mt-xl
                BlocklyToggle.full-width(ref='workspaceBtn3' target='workspace3' @toggled='toggleWorkspace')
            .col-12.col-md-6
              .relative(style='height: 400px;')
                BlocklyWorkspace(ref='workspace3' @onIsRunning='updateButton("workspaceBtn3", $event)' workspaceID='c2129a2b-1c90-4442-90ba-7c8e3fe9fc10' :options='{trashcan: false}' static)


    section
      h2 View and share as forms
      h5 Once blocks are assembled, you can view and share them as simplified forms. For example, the following forms were generated from the blocks above:

      .row.q-col-gutter-md.q-mt-xl
        .q-mb-md.col-xs-12.col-md-4
          q-card
            q-card-section
              .relative(style='height: 300px;')
                BlocklyWorkspace(ref='form1' @onIsRunning='updateButton("formBtn1", $event)' workspaceID='a0352aba-3515-4e98-871c-fcf48b853a8f' :options='{trashcan: false}' static showForm)
            q-card-actions
              BlocklyToggle.full-width(ref='formBtn1' target='form1' @toggled='toggleWorkspace')
        .q-mb-md.col-xs-12.col-md-4
          q-card
            q-card-section
              .relative(style='height: 300px;')
                BlocklyWorkspace(ref='form2' @onIsRunning='updateButton("formBtn2", $event)' workspaceID='e0ebb972-48ef-4e3e-92cc-89efa1d2deda' :options='{trashcan: false}' static showForm)
            q-card-actions
              BlocklyToggle.full-width(ref='formBtn2' target='form2' @toggled='toggleWorkspace')
        .q-mb-md.col-xs-12.col-md-4
          q-card
            q-card-section
              .relative(style='height: 300px;')
                BlocklyWorkspace(ref='form3' @onIsRunning='updateButton("formBtn3", $event)' workspaceID='c2129a2b-1c90-4442-90ba-7c8e3fe9fc10' :options='{trashcan: false}' static showForm)
            q-card-actions
              BlocklyToggle.full-width(ref='formBtn3' target='form3' @toggled='toggleWorkspace')

    section
      .row.flex
        .col
      .row.q-col-gutter-md
        .q-mb-md.col-xs-12.col-md-6
            q-card
              q-card-section
                h2 More coming soon
                q-card.q-mb-lg.bg-blue
                  q-card-section
                    div 📅 <strong>22-10-25</strong> - Hi, thanks for visiting! This project is still a <strong>super early prototype</strong>; it's buggy but in <a href="https://github.com/modelprompter/modelprompter">active development</a>!
        .q-mb-md.col-xs-12.col-md-6
          q-card
            .text-center
              div.gt-md(style='padding: 120px 20px; padding-bottom: 140px')
                img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')
              div.lt-md(style='padding: 20px; padding-bottom: 20px')
                img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')

              div.text-h5
                strong.text-white Prompt engineering with blocks
            q-card-section
              p Use programmable blocks to automate prompts to Stable Diffusion, Colab Notebooks, bots, webhooks, and any API. <strong>Then use more blocks to configure how the data is organized and displayed!</strong>
              p.q-mt-sm.text-center
                a(href='https://github.com/ModelPrompter/modelprompter') GitHub
                span.q-mx-sm ·
                a(href='https://twitter.com/ModelPrompter') Twitter
                span.q-mx-sm ·
                a(href='https://discord.gg/GFJ2ftEQWF') Discord
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import BlocklyToggle from 'src/components/BlocklyToggle.vue'
import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance()

function toggleWorkspace (workspaceID, state) {
  instance.refs[workspaceID].setState(state)
}

function updateButton (workspaceID, state) {
  instance.refs[workspaceID].setState(state)
}

</script>
