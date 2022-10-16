<template lang="pug">
q-page
  .content
    .row.flex
      .col
        q-card.q-mb-lg.bg-blue
          q-card-section
            div 📅 <strong>22-10-15</strong> - Hi, thanks for visiting! This project is still a <strong>super early prototype</strong>; it's buggy but in <a href="https://github.com/modelprompter/modelprompter">active development</a>!
    .row.q-col-gutter-md
      .q-mb-md.col-xs-12.col-md-6
        q-card
          .text-center
            div.gt-md(style='padding: 110px 50px; padding-bottom: 140px')
              img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')
            div.lt-md(style='padding: 20px; padding-bottom: 20px')
              img(src='~/src/assets/logo-title.png' style='width: 100%; vertical-align: middle;')

            div.text-h5
              strong.text-white Prompt engineering with blocks
          q-card-section
            p Use programmable blocks to automate prompts to Stable Diffusion, Colab Notebooks, bots, webhooks, and any API. <strong>Then use more blocks to configure how the data is displayed!</strong>
            p.q-mt-sm.text-center
              a(href='https://github.com/ModelPrompter/modelprompter') GitHub
              span.q-mx-sm ·
              a(href='https://twitter.com/ModelPrompter') Twitter

      .col-12.col-md-6
        q-card
          .text-center
            div(style='height: 290px; position: relative')
              BlocklyWorkspace(workspaceID='a0352aba-3515-4e98-871c-fcf48b853a8f' :options='{trashcan: false}')
            div.q-mt-md
              div.text-h5
                strong.text-white Try it!
          q-card-section
            p The blocks above will load 50 images and prompts from <a href="https://lexica.art">Lexica.art</a> and display them in a grid. <strong>Try editing the prompt and pressing "Run Blocks" below to view the data feed.</strong>
            div.q-mb-sm
              BlocklyToggle.full-width

    q-card.q-mt-lg
      q-card-section
        div 📅 <strong>More coming soon!</strong> If you'd like to explore, use the left menu to work with blocks and the right menu to work with the results.
    //- .row.flex.q-gutter-md.q-mt-sm
    //-   q-card
    //-     q-card-section
    //-       .row
            //- .col.col-md-4
            //-   h1 Why
            //- .col.col-md-8
            //-   p I am
</template>

<script setup>
import BlocklyWorkspace from 'src/components/BlocklyWorkspace.vue'
import BlocklyToggle from 'src/components/BlocklyToggle.vue'
</script>
