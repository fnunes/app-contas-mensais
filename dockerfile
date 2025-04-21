# Etapa 1: build da aplicação
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servidor nginx para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração do nginx (opcional, veja abaixo)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
