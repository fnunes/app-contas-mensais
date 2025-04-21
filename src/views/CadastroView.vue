<template>
    <div class="container py-4">
      <h2 class="mb-4">Cadastrar Nova Conta</h2>
      <form @submit.prevent="addConta" class="row g-3">
        <div class="col-md-6">
          <input v-model="form.titulo" type="text" class="form-control" placeholder="Título" required />
        </div>
        <div class="col-md-3">
          <input v-model="form.vencimento" type="date" class="form-control" required />
        </div>
        <div class="col-md-2">
          <select v-model="form.categoria" class="form-select" required>
            <option disabled value="">Categoria</option>
            <option>Cartões</option>
            <option>Boletos</option>
            <option>Ensino</option>
            <option>Outros</option>
          </select>
        </div>
        <div class="col-md-1 form-check">
          <input v-model="form.recorrente" type="checkbox" class="form-check-input" id="recorrente" />
          <label class="form-check-label" for="recorrente">Rec.</label>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-success">Salvar</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { db, auth } from '../services/firebase'
  import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
  
  const form = ref({
    titulo: '',
    vencimento: '',
    categoria: '',
    recorrente: false
  })
  
  const router = useRouter()
  
  const addConta = async () => {
    const user = auth.currentUser
  
    const partes = form.value.vencimento.split('-')
    const vencimento = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]))
  
    await addDoc(collection(db, 'contas'), {
      ...form.value,
      uid: user.uid,
      paga: false,
      dataCriacao: serverTimestamp(),
      vencimento: vencimento
    })
  
    form.value = { titulo: '', vencimento: '', categoria: '', recorrente: false }
    router.push('/dashboard')
  }
  </script>