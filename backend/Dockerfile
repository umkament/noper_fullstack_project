# backend Dockerfile

# Используем Node.js образ
FROM node:18
WORKDIR /app 

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

EXPOSE 4411

# Запуск бэкенда
CMD ["npm", "start"]
