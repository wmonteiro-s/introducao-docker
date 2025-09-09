# Etapa 1: Imagem base do Node
FROM node:20-alpine

# Etapa 2: Definir o diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar arquivos de dependêndia e instalar
# O comando COPY funciona da seguinte forma:
# - Se houver package-lock.json, ele será copiado junto com package.json
COPY package*.json ./
RUN npm install

# Etapa 4: Copiar o restante dos arquivos e compilar
COPY . .
RUN npx prisma generate
RUN npm run build

# Etapa 5: Expor a porta da aplicação
EXPOSE 3002