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
        path: '/overview/workspaces',
        name: 'docsWorkspaces',
        component: () => import('pages/IndexPage.vue')
      },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'new',
        path: '/',
        components: {
          default: () => import('pages/workspace/Editor.vue'),
          dashboardMain: () => import('pages/workspace/DashboardMain.vue'),
          toolbar: () => import('src/components/BlocklyToggle.vue'),
        },
      }
    ]
  },

  {
    path: '/workspace',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        name: 'workspace',
        path: '/workspace/:id',
        components: {
          default: () => import('pages/workspace/Editor.vue'),
          dashboardMain: () => import('pages/workspace/DashboardMain.vue'),
          toolbar: () => import('src/components/BlocklyToggle.vue'),
        },
        children: [
          {
            name: 'workspace-form',
            path: '/workspace/:id/form',
            components: {
              default: () => import('pages/workspace/Editor.vue'),
              dashboardMain: () => import('pages/workspace/DashboardMain.vue'),
              toolbar: () => import('src/components/BlocklyToggle.vue'),
            }
          },
          {
            name: 'workspace-detail',
            path: '/workspace/:id/detail',
            components: {
              default: () => import('pages/workspace/Editor.vue'),
              dashboardMain: () => import('pages/workspace/DashboardMain.vue'),
              toolbar: () => import('src/components/BlocklyToggle.vue'),
            },
            children: [
              {
                name: 'workspace-detail-form',
                path: '/workspace/:id/detail/form',
                components: {
                  default: () => import('pages/workspace/Editor.vue'),
                  dashboardMain: () => import('pages/workspace/DashboardMain.vue'),
                  toolbar: () => import('src/components/BlocklyToggle.vue'),
                }
              },
            ]
          }
        ]
      },
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
          default: () => import('pages/library/Layout.vue')
        },
      },
      {
        name: 'libraryRepos',
        path: '/library/repos',
        components: {
          default: () => import('pages/library/Layout.vue')
        },
      },
      {
        name: 'libraryReset',
        path: '/library/reset',
        components: {
          default: () => import('pages/library/Layout.vue')
        }
      },
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
          default: () => import('pages/blog/Layout.vue')
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
