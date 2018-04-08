import Vue from 'vue'
import Router from 'vue-router'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Router)

const routerOptions = [
  { path: '/', component: 'LandingPage' },
  { path: '/login', component: 'LoginPage' },
  { path: '/map', component: 'MapPage'}
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

export default new Router({
  mode: 'history',
  routes
})