<template>
    <div class="container mt-5" style="max-width: 400px">
      <h2 class="mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Senha</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-2">Entrar</button>
      </form>
      <button @click="loginComGoogle" class="btn btn-outline-danger w-100">
        Entrar com Google
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
  import { auth } from '../services/firebase'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/dashboard')
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message)
    }
  }
  
  const loginComGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (error) {
      alert('Erro ao entrar com Google: ' + error.message)
    }
  }
  </script>