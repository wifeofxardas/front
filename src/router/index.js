import Vue from 'vue'
import Router from 'vue-router'
import Auction from '@/components/auction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auction',
      component: Auction
    }
    // {
    //   path: '/aa/:aa',
    //   name: 'ss',
    //   component: sss,
    //   props: true
    // }
  ]
})
