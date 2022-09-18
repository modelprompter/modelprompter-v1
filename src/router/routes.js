
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
      { path: '/quick/gpus', component: () => import('pages/quick/GPUs.vue') }
    ]
  },

  {
    path: '/block',
    component: () => import('layouts/Full.vue'),
    children: [
      { path: '/block', component: () => import('src/pages/block/Editor.vue') },
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
