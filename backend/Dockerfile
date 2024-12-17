# backend Dockerfile

# Используем Node.js образ
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .

# Слушаем порт 5000 (или другой)
EXPOSE 4411

# Запуск бэкенда
CMD ["npm", "start"]
