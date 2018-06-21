import Vue from 'vue'
import Router from 'vue-router'
import Auction from '@/components/auction'
import CreateLot from '@/components/create-lot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auction',
      component: Auction
    },
    {
      path: '/create',
      name: 'CreateLot',
      component: CreateLot
    }
  ]
})
