
const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/reset', component: () => import('pages/ResetPage.vue') },
    ]
  },

  // {
  //   path: '/quick',
  //   component: () => import('layouts/QuickPrompter.vue'),
  //   children: [
  //     { path: '/quick', component: () => import('pages/quick/Prompter.vue') },
  //     { path: '/quick/gpus', component: () => import('pages/quick/GPUs.vue') }
  //   ]
  // },

  {
    path: '/workspace',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'workspace-new',
        path: '/workspace',
        components: {
          default: () => import('src/pages/workspace/Editor.vue'),
          dashboardMain: () => import('src/pages/workspace/DashboardMain.vue'),
          toolbar: () => import('src/components/BlocklyToggle.vue'),
        },
        children: [
          {
            name: 'workspace',
            path: '/workspace/:id',
            components: {
              default: () => import('src/pages/workspace/Editor.vue'),
              dashboardMain: () => import('src/pages/workspace/DashboardMain.vue'),
              toolbar: () => import('src/components/BlocklyToggle.vue'),
            }
          },
          {
            name: 'workspace-detail',
            path: '/workspace/:id/detail',
            components: {
              default: () => import('src/pages/workspace/Editor.vue'),
              dashboardMain: () => import('src/pages/workspace/DashboardMain.vue'),
              toolbar: () => import('src/components/BlocklyToggle.vue'),
            }
          }
        ]
      }
    ]
  },

  {
    path: '/library',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'library',
        path: '/library',
        components: {
          default: () => import('src/pages/workspace/DashboardMain.vue')
        },
      }
    ]
  },

  {
    path: '/blog',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'blog',
        path: '/blog',
        components: {
          default: () => import('src/pages/blog/BlogMain.vue')
        },
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
