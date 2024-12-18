# frontend Dockerfile

# Используем Node.js образ
FROM node:alpine as build 

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем package.json и устанавливаем зависимости
#COPY package*.json ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Копируем все файлы проекта
COPY . .
RUN pnpm build

# Stage 2: Nginx
FROM nginx:stable-alpine
# FROM nginx:1.26

# Копируем собранный фронтенд
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

# Запуск фронтенда
CMD ["nginx", "-g", "daemon off;"]


# # Stage 1: Build the frontend
# FROM node:18 as build

# # Устанавливаем рабочую директорию
# WORKDIR /app

# # Копируем файл package.json и pnpm-lock.yaml (если он есть)
# COPY package.json pnpm-lock.yaml ./

# # Устанавливаем pnpm
# RUN npm install -g pnpm

# # Устанавливаем все зависимости
# RUN pnpm install

# # Копируем все файлы проекта
# COPY . .

# # Сборка фронтенда
# RUN pnpm build

# # Stage 2: Используем Nginx для сервировки файлов
# FROM nginx:stable-alpine

# # Копируем собранные файлы из предыдущего шага
# COPY --from=build /app/dist /usr/share/nginx/html

# # Копируем конфигурацию Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

# # Открываем порты
# EXPOSE 80

# # Запускаем Nginx
# CMD ["nginx", "-g", "daemon off;"]
