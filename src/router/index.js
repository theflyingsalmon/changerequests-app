// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import ChangeRequests from '@/views/ChangeRequests.vue';

const routes = [
  { path: '/', name: 'ChangeRequests', component: ChangeRequests },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
