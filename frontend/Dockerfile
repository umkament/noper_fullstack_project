# Используем Node.js образ
FROM node:20 AS build

WORKDIR /app 

# # Устанавливаем npm (если его нет)
# RUN apk add --no-cache npm

# Устанавливаем pnpm
RUN npm install -g pnpm


# Копируем только package.json и pnpm-lock.yaml для установки зависимостей
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install


COPY . .

# Собираем проект
RUN pnpm run build

# Переходим на Nginx
FROM nginx:stable-alpine

# Копируем собранный фронтенд
COPY --from=build  app/dist /usr/share/nginx/html
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
