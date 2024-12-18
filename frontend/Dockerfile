# Используем Node.js образ
FROM node:16 AS build

# Устанавливаем pnpm
RUN npm install -g pnpm

WORKDIR /app

# Копируем только package.json и pnpm-lock.yaml для установки зависимостей
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN pnpm run build

# Переходим на Nginx
FROM nginx:stable-alpine

# Копируем собранный фронтенд
COPY --from=build /app/build /usr/share/nginx/html
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
