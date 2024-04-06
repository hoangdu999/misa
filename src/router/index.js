import {createRouter,createWebHistory } from 'vue-router'

import routes from '@/assets/js/routes'

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router;