import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import CadastroView from '../views/CadastroView.vue'

const routes = [
  { path: '/', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/cadastro',
    component: CadastroView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.meta.requiresAuth && !user) next('/')
    else next()
  })
})

export default router

