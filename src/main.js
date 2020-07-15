import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import VueRouter from 'vue-router'
// import icon from './assets/iconfont.css'

// Vue.use (icon)
Vue.use(VueRouter);
const router = new VueRouter({
  routes:[
    {
      path:'/ricwn',
      component:{
        template:'<h1>日程</h1>'
      }
    },
    {
      path:'/daiban',
      component:{
        template:'<h1>待办</h1>'
      }
    }
  ]
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
