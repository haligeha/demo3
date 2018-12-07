import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import HelloWorld from '../components/HelloWorld.vue'
import Forms from '../components/Forms.vue'
import Tables from '../components/Tables.vue'
import UIElement from '../components/UIElement.vue'
import Goods from '../components/Goods.vue'
import RescueTeam from '../components/RescueTeam.vue'
import Equipment from '../components/Equipment.vue'
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
    path: '/tables',
    component: Tables
  },

  {
    path: '/uielement',
    component: UIElement
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/equipment',
    component: Equipment
  },
  {
    path: '/rescueTeam',
    component: RescueTeam
  },
  {
    path: '/shelter',
    component: Shelter
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
