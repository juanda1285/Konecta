# Usar una imagen base de Node.js 18 (puedes cambiarla a 23.7.0 si está disponible)
FROM node:23.7.0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Instalar dependencias
RUN pnpm install

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre el backend
EXPOSE 3001

# Comando para iniciar el servidor
CMD ["node", "index.js"]