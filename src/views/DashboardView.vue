<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Minhas Contas</h2>
      <button class="btn btn-outline-secondary" @click="logout">Sair</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-md-3">
        <label class="form-label">Mês</label>
        <select v-model="filtroMes" class="form-select">
          <option v-for="m in 12" :value="m-1" :key="m">{{ m }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label class="form-label">Ano</label>
        <select v-model="filtroAno" class="form-select">
          <option v-for="ano in anosDisponiveis" :key="ano" :value="ano">{{ ano }}</option>
        </select>
      </div>
    </div>

    <div v-if="alertas.length" class="alert alert-danger">
      <strong>Atenção:</strong> Você tem contas próximas do vencimento!
      <ul class="mb-0">
        <li v-for="alerta in alertas" :key="alerta.id">
          {{ alerta.titulo }} - vence em {{ new Date(alerta.vencimento.seconds * 1000).toLocaleDateString() }}
        </li>
      </ul>
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Título</th>
          <th>Vencimento</th>
          <th>Categoria</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <AccountCard
          v-for="conta in contasFiltradas"
          :key="conta.id"
          :conta="conta"
          @marcar-paga="marcarComoPaga"
          @excluir-conta="excluirConta"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '../services/firebase'
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import AccountCard from '../components/AccountCard.vue'

const contas = ref([])
const alertas = ref([])
const router = useRouter()

const hoje = new Date()
const filtroMes = ref(hoje.getMonth())
const filtroAno = ref(hoje.getFullYear())
const anosDisponiveis = ref([hoje.getFullYear()])

const contasFiltradas = computed(() => {
  return contas.value.filter(conta => {
    const data = new Date(conta.vencimento.seconds * 1000)
    return data.getMonth() === filtroMes.value && data.getFullYear() === filtroAno.value
  }).sort((a, b) => new Date(a.vencimento.seconds * 1000) - new Date(b.vencimento.seconds * 1000))
})

const carregarContas = async () => {
  const user = auth.currentUser
  const q = query(collection(db, 'contas'), where('uid', '==', user.uid))
  const snapshot = await getDocs(q)
  contas.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  if (contas.value.length === 0) {
    router.push('/cadastro')
    return
  }

  // definir anos disponíveis
  const anos = new Set(contas.value.map(c => new Date(c.vencimento.seconds * 1000).getFullYear()))
  anosDisponiveis.value = Array.from(anos).sort()

  const tresDias = new Date()
  tresDias.setDate(hoje.getDate() + 3)

  alertas.value = contas.value.filter(conta => {
    const venc = new Date(conta.vencimento.seconds * 1000)
    return !conta.paga && venc >= hoje && venc <= tresDias
  })
}

const marcarComoPaga = async (id) => {
  const conta = contas.value.find(c => c.id === id)
  const refDoc = doc(db, 'contas', id)
  const novaSituacao = !conta.paga

  const updateData = {
    paga: novaSituacao,
    dataPagamento: novaSituacao ? new Date() : null
  }

  await updateDoc(refDoc, updateData)
  carregarContas()
}


const excluirConta = async (id) => {
  const refDoc = doc(db, 'contas', id)
  await deleteDoc(refDoc)
  carregarContas()
}

const logout = async () => {
  await signOut(auth)
  router.push('/')
}

onMounted(carregarContas)
</script>
