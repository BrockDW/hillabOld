import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/account/login'
import index from '@/components/index'
import profile from '@/components/account/profile'
import level from '@/components/level/level'

// Transition Pages
import levelup from '@/components/transitionPages/levelup'
import volGymModeChoose from '@/components/transitionPages/volGymModeChoose'

// Exercise Pages
import lessonExercise from '@/components/exerciseMode/lessonExercise_mode'
import volGymStudyMode from '@/components/volGym/studyMode'
import volGymMemorizeMode from '@/components/volGym/memorizeMode'

// Lessons Pages
import lesson1 from '@/components/contents/lesson1'

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
    {
      path: '/levelup',
      name: 'levelup',
      component: levelup
    },
    // Volcabulary Gym Pages
    {
      path: '/volGymModeChoose',
      name: 'volGymModeChoose',
      component: volGymModeChoose
    },
    {
      path: '/volGym/studyMode',
      name: 'volGymStudyMode',
      component: volGymStudyMode,
    },
    {
      path: '/volGym/memorizeMode',
      name: 'volGymMemorizeMode',
      component: volGymMemorizeMode
    },

    // Lessons
    {
      path: '/lesson1',
      name: 'lesson1',
      component: lesson1
    },

    // Exercises
    {
      path: '/lessonExercise',
      name: 'lessonExercise',
      component: lessonExercise
    },
  ]
})
