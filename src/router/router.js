import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import HelloWorld from '../components/HelloWorld.vue'
import Forms from '../components/Forms.vue'
import Chart from '../components/Chart.vue'
import Tables from '../components/Tables.vue'
import UIElement from '../components/UIElement.vue'
import Empty from '../components/Empty.vue'
import Goods from '../components/Goods.vue'
import Equipment from '../components/Equipment.vue'
import RescueTeam from '../components/RescueTeam.vue'
import Shelter from '../components/Shelter.vue'
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
  },
  {
    path:'/goods',
    component: Goods
  },
  {
    path:'/equipment',
    component: Equipment
  },
  {
    path:'/rescueTeam',
    component: RescueTeam
  },
  {
    path:'/shelter',
    component: Shelter
  }
]

var router = new VueRouter({
  routes
})
export default router
