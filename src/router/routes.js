
const routes = [
  {
    path: '/',
    component: () => import('layouts/Base.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
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
    path: '/block',
    component: () => import('layouts/Base.vue'),
    children: [
      {
        path: '/block',
        components: {
          default: () => import('src/pages/block/Editor.vue'),
          dashboardMain: () => import('src/pages/block/DashboardMain.vue'),
          dashboardSidebar: () => import('src/pages/block/DashboardSidebar.vue'),
          toolbar: () => import('src/pages/block/Toolbar.vue'),
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
