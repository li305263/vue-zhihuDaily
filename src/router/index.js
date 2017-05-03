import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/detail'
import comment from '@/components/comment'
import theme from '@/components/theme'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path: '/',
      redirect:'index',
      component: index,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/theme/:id',
          name: 'theme',
          component: theme
        },
      ]
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/comment/:id',
      name: 'comment',
      component: comment
    },
    


  ]
})
