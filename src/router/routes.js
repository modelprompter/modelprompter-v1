
const routes = [
  {
    path: '/',
    component: () => import('layouts/Full.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },

  {
    path: '/quick',
    component: () => import('layouts/QuickPrompter.vue'),
    children: [
      { path: '/quick', component: () => import('pages/quick/Prompter.vue') },
      { path: '/quick/servers', component: () => import('pages/quick/Servers.vue') }
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
