import Vue from 'vue'
import Router from 'vue-router'
import index from './com/index.vue'
import no1 from './com/no1.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/no1',
      name: 'no1',
      component: no1
    }
  ]
})
