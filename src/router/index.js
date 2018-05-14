import Vue from 'vue'
import Router from 'vue-router'
import CompetitorsIndex from '@/components/CompetitorsIndex'
import CompetitorShow from '@/components/CompetitorShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Competitors',
      component: CompetitorsIndex
    }, {
      path: '/competitors/:id',
      name: 'Competitor',
      component: CompetitorShow
    }
  ]
})
