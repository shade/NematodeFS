import Vue from 'vue'
import Router from 'vue-router'
import LoginView from '@/components/LoginView'
import FileView from '@/components/FileView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/home',
      name: 'FileView',
      component: FileView
    }
  ]
})
