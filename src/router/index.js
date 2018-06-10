import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Competitor from '@/components/Competitor'
import Scoreboard from '@/components/Scoreboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/competitors/:id',
      name: 'Competitor',
      component: Competitor
    }, {
      path: '/scoreboard/:category/:page',
      name: 'Scoreboard',
      component: Scoreboard
    }
  ]
})
