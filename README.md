# Contas Mensais - Aplicação Web

Gerencie suas contas mensais com organização e praticidade. Desenvolvido com Vue 3, Firebase, Bootstrap e empacotado para desktop com Tauri.

---

## 📦 Tecnologias Utilizadas
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Firebase Auth & Firestore](https://firebase.google.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Tauri](https://tauri.app/) (opcional para versão desktop)

---

## 🚀 Funcionalidades

- Autenticação com e-mail/senha ou Google
- Cadastro de contas com recorrência mensal
- Listagem com filtros por mês e ano
- Marcação de conta como paga e desmarcação
- Alertas para contas próximas do vencimento (em até 3 dias)
- Exclusão de contas
- Deploy web via Firebase ou Docker
- Empacotamento para desktop com Tauri

---

## 📁 Estrutura de Pastas
```
/src
 ├─ components
 │   └─ AccountCard.vue
 ├─ services
 │   └─ firebase.js
 ├─ views
 │   ├─ LoginView.vue
 │   ├─ DashboardView.vue
 │   └─ CadastroView.vue
 ├─ router
 │   └─ index.js
 └─ App.vue
```

---

## 🔧 Instalação e Execução

```bash
# Clonar o projeto
git clone https://github.com/seuusuario/contas-mensais.git
cd contas-mensais

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

---

## 🔐 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Firestore e Authentication (e-mail/senha + Google)
3. Copie as credenciais para `src/services/firebase.js`
4. Caso o arquivo `src/services/firebase.js` não exista, você precisa criá-lo.

---

---
Ao criar o arquivo src/services/firebase.js, incluir esse conteúdo e preencher com as informações corretas da sua conta.
```bash
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
```
---

## 🐳 Docker
```bash
npm run build
# Build da imagem
docker build -t contas-mensais-app .
# Rodar container
docker run -d -p 8080:80 contas-mensais-app
# Opcionalmente com docker compose
docker-compose up --build
```
Acesse: [http://localhost:8080](http://localhost:8080)

---

## 🖥️ Versão Desktop com Tauri

```bash
# Instale o Tauri
npm install --save-dev @tauri-apps/cli
npx tauri init

# Empacotar aplicação
npm run build
npx tauri build
```

---

## 📝 Licença
Este projeto é licenciado sob a MIT License.

---

## 🙌 Contribuições
Pull requests são bem-vindos! Para contribuições maiores, abra uma issue primeiro.

---

Feito com 💚 para manter suas contas organizadas.
