<template lang="pug">
q-page
  .content
    section.q-mb-none
      .row.flex
        .col
          q-card.q-mb-lg.bg-blue
            q-card-section
              div 📅 <strong>22-11-12</strong> - Hi, thanks for visiting! Beta has been pushed back to <strong>December 1st</strong> so do check back. Check out <a href="/blog">The Model Prompter Notion</a> for more!

    q-tabs(v-model='tab' align='left')
      q-route-tab(name='overview' :to='{name: "docsOverview"}' exact label='Intro')
      q-route-tab(name='workspaces' :to='{name: "docsWorkspaces"}' exact label='🏗 Coming soon')
    q-tab-panels(v-model='tab')
      q-tab-panel(name='overview')
        div
          .row.q-col-gutter-md
            .q-mb-md.col-xs-12.col-md-6.col-lg-4
              q-card
                q-card-section.text-center
                  img(src='~/src/assets/logo-title.png' style='vertical-align: middle; max-height: 48px; width: auto; max-width: 100%')
                q-card-section
                  div.text-h5
                    strong.text-white Connect web services and AI models to create and remix bots, content generators, and automated workflows
                q-card-section
                  div Model Prompter is a customizable API playground that uses a visual block interface to help you connect different ideas, web services, and AI models together ✨🧑‍💻✨
                q-card-section
                  p
                    q-btn.full-width(to='/blog' color='blue' icon='info_outline')
                      span.q-pl-sm learn about the project
                  div.text-center
                    small
                      strong or follow along below
                //- q-card-section
                //-   p.text-center
                //-     q-btn(disabled) Login (coming soon)
                div.text-center
                  a.q-mr-md(href='https://github.com/modelprompter/modelprompter' target='_blank')
                    img(src='https://img.shields.io/github/stars/ModelPrompter/modelprompter?label=Star%20on%20GtiHub&style=social')
                  a.q-mr-md(href='https://twitter.com/modelprompter' target='_blank')
                    img(src='https://img.shields.io/twitter/follow/modelprompter?label=Follow%20%40ModelPrompter&style=social')
                  a.q-mr-md(href='https://discord.gg/GFJ2ftEQWF' target='_blank')
                    img(src='https://img.shields.io/discord/1032046629768937484?label=%F0%9F%92%AC%20Chat%20on%20Discord&style=social')
                div &nbsp;
            .col-12.col-md-6.col-lg-8
              q-card
                div(style='height: 270px; position: relative')
                  BlocklyWorkspace(ref='workspace1' @onIsRunning='updateButton("workspaceBtn1", $event)' workspaceID='a0352aba-3515-4e98-871c-fcf48b853a8f' :options='{trashcan: false}' static)
                q-card-section
                  p.text-h5
                    strong.text-white Quickstart Introduction
                  p <strong>Above are 2 blocks:</strong> the block to the left sets a variable called "<code>Prompt</code>" to the value attached to it, in this case a text block set to "studio ghibli purple clouds". When you press the <strong>Run Blocks</strong> button below, "<code>Prompt</code>" will be used to query <a href="https://lexica.art">Lexica.art</a> to match your prompt to a contextually similar prompt and image.
                  p (more info coming soon)
                  p
                  //- div In future tutorials we'll build virtual assistants and bots that can help us see the idea all the way through.
                  //- div These blocks generate 50 random topics from Wikipedia. By default images are turned off, but you can turn them on by setting <strong>"Show Images"</strong> to <strong>true</strong> and running the blocks again.
                  //- div.text-center.q-pa-sm
                  //- small
                  //-                       strong NSFW warning:
                  //-                       span  some generated content may bypass the filter
                  //- p By the end of this guide you'll have learned how to discover, use, and connect AI models and web services to generate stories and illustrations, videos and thumbnails, content for blogs, and more!
                  div.q-mb-sm
                    BlocklyToggle.full-width(ref='workspaceBtn1' target='workspace1' @toggled='toggleWorkspace')

      q-tab-panel(name='workspaces')
        section
          q-card.q-mb-xl
            q-card-section
              .row.q-col-gutter-md
                .col-12.col-md-4
                  h2 Imagine words as blocks
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
                  h2 Chain together AI and web services
                  p Use data from any source you have access to, like Google Sheets, Notion Databases, Wikipedia, Twitter, or any other API on the web. <strong>With the Model Prompter client (coming soon), you'll even be able to use cURL to scrape any URL whether it has an API or not!</strong>
                  p Here we load a random topic title from Wikipedia and use it to prompt for 50 images from Lexica.
                  div.q-mt-xl
                    BlocklyToggle.full-width(ref='workspaceBtn3' target='workspace3' @toggled='toggleWorkspace')
                .col-12.col-md-6
                  .relative(style='height: 400px;')
                    BlocklyWorkspace(ref='workspace3' @onIsRunning='updateButton("workspaceBtn3", $event)' workspaceID='c2129a2b-1c90-4442-90ba-7c8e3fe9fc10' :options='{trashcan: false}' static)


        section.q-mb-none
          q-card
            q-card-section.q-pb-none
              h2 View and share as forms
              h5 Once blocks are assembled, you can view and share them as simplified forms. <strong>Right click or long tap on a block to show its menu, then select "Add to form".</strong>
              h5.q-mb-xl For example, the following forms were generated from the blocks above:

              .row.q-col-gutter-md
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
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import BlocklyToggle from 'src/components/BlocklyToggle.vue'
import {getCurrentInstance} from 'vue'

const instance = getCurrentInstance()
let tab = $ref('overview')

function toggleWorkspace (workspaceID, state) {
  instance.refs[workspaceID].setState(state)
}

function updateButton (workspaceID, state) {
  instance.refs[workspaceID].setState(state)
}

</script>
