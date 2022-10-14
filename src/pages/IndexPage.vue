<template lang="pug">
q-page
  .content
    .row.flex
      .col
        q-card.q-mb-lg.bg-blue
          q-card-section
            div 📅 <strong>22-10-13</strong> - Hi, thanks for visiting! This project is still a <strong>super early prototype</strong>; lots of examples and documentation coming soon!
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
            div.text-h5
              strong.text-white Dynamic prompt engineering with blocks
          q-card-section
            p Use programmable blocks to automate prompts to Stable Diffusion, Colab Notebooks, bots, webhooks, and any other API on the web. <strong>Then use more blocks to configure how the data is displayed!</strong>
            p.q-mt-sm.text-center
              a(href='https://github.com/ModelPrompter/modelprompter') GitHub
              span.q-mx-sm ·
              a(href='https://twitter.com/ModelPrompter') Twitter

      .col.col-md-6
        q-card
          .text-center
            div(style='height: 290px; position: relative')
              BlocklyWorkspace(:hideToolbox='true' workspaceID='1b8c46a7-145a-4d23-b076-4d8538afe220' :options='{trashcan: false, }')
            div.q-mt-md
              strong.q-mr-sm Workspace:
              router-link(:to='{path: `/workspace/1b8c46a7-145a-4d23-b076-4d8538afe220`}') Lexica quick search
          q-card-section
            p The blocks above will load 50 images and prompts from <a href="https://lexica.art">Lexica.art</a> and display them in a grid. <strong>Use the mouse wheel or pinch to zoom out, then click and drag on the grid around to reveal more!</strong>
            div.q-mb-sm
              BlocklyToggle.full-width

    q-card.q-mt-lg.bg-blue
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
