
const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '/',
        name: 'docsOverview',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/docs/workspaces',
        name: 'docsWorkspaces',
        component: () => import('pages/IndexPage.vue')
      },
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
            },
            children: [
              {
                name: 'workspace-form',
                path: '/workspace/:id/form',
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
                },
                children: [
                  {
                    name: 'workspace-detail-form',
                    path: '/workspace/:id/detail/form',
                    components: {
                      default: () => import('src/pages/workspace/Editor.vue'),
                      dashboardMain: () => import('src/pages/workspace/DashboardMain.vue'),
                      toolbar: () => import('src/components/BlocklyToggle.vue'),
                    }
                  },
                ]
              }
            ]
          },
        ]
      }
    ]
  },

  {
    path: '/library',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'librarySession',
        path: '/library',
        components: {
          default: () => import('src/pages/library/Layout.vue')
        },
      },
      {
        name: 'libraryRepos',
        path: '/library/repos',
        components: {
          default: () => import('src/pages/library/Layout.vue')
        },
      },
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
