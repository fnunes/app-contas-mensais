<template>
  <tr v-if="conta">
    <td>{{ conta.titulo }}</td>
    <td>{{ new Date(conta.vencimento?.seconds * 1000).toLocaleDateString() }}</td>
    <td>{{ conta.categoria }}</td>
    <td>
      <span :class="['badge', conta.paga ? 'bg-success' : 'bg-warning']">
        {{ conta.paga ? 'Paga' : 'Pendente' }}
      </span>
    </td>
    <td>
      <button 
        v-if="!conta.paga" 
        class="btn btn-sm btn-outline-primary me-1" 
        @click="$emit('marcar-paga', conta.id)">
        Marcar como paga
      </button>
      <button 
        v-if="conta.paga" 
        class="btn btn-sm btn-outline-primary me-1" 
        @click="$emit('marcar-paga', conta.id)">
        Marcar como pendente
      </button>
      <button 
        class="btn btn-sm btn-outline-danger" 
        @click="$emit('excluir-conta', conta.id)">
        Excluir
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps(['conta'])
defineEmits(['marcar-paga', 'excluir-conta'])
</script>