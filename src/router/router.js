import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import HelloWorld from '../components/HelloWorld.vue'
import Forms from '../components/Forms.vue'
import Chart from '../components/Chart.vue'
import Tables from '../components/Tables.vue'
import UIElement from '../components/UIElement.vue'
import Empty from '../components/Empty.vue'
// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter)

const routes = [
  {
    path: '/hello',
    component: HelloWorld
  },
  {
    path: '/forms',
    component: Forms
  },
  {
    path: '/chart',
    component: Chart
  },
  {
    path: '/tables',
    component: Tables
  },
  {
    path: '/empty',
    component: Empty
  },
  {
    path: '/uielement',
    component: UIElement
  },
  {
    path: '/',
    redirect: '/hello'
  }
]

var router = new VueRouter({
  routes
})
export default router
