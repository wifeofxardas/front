import Vue from 'vue'
import Router from 'vue-router'
import Lots from '@/components/lots'
import About from '@/components/about'
import CreateLot from '@/components/create-lot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'about',
      component: About
    },
    {
      path: '/lots/:address/:state?',
      name: 'lots',
      component: Lots
    },
    {
      path: '/lots',
      name: 'emptyLots',
      component: Lots
    },
    {
      path: '/create',
      name: 'createLot',
      component: CreateLot
    }
  ]
})
