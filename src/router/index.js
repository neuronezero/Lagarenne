import Vue from 'vue'
import Router from 'vue-router'
import Mesures from '@/components/Mesures'
import ChemChart from '@/components/ChemChart'
import Home from '@/components/Home'
import Substances from '@/components/Substances'

Vue.use(Router)

const routes = [
  {
    path:'/',
    name:'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'ChemChart',
        component: ChemChart
      }
    ]
  },
  {
    path: '/mesures',
    name: 'Mesures',
    component: Mesures
  },
  {
    path: '/substances',
    name: 'Substances',
    component: Substances
  }
]

export default new Router({
  routes
})
