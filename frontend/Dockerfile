# frontend Dockerfile

# Используем Node.js образ
FROM node:alpine as build 

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN pnpm install

# Копируем все файлы проекта
COPY . .
RUN pnpm build

# Stage 2: Nginx
FROM nginx:stable-alpine

# Копируем собранный фронтенд
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Запуск фронтенда
CMD ["nginx", "-g", "daemon off;"]
