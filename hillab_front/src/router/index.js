import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/account/login'
import index from '@/components/index'
import profile from '@/components/account/profile'
import level from '@/components/level/level'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: profile
        },
        {
          path: '/level',
          name: 'level',
          component: level
        }
      ]
    },
  ]
})
