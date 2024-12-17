# frontend Dockerfile

# Используем Node.js образ
FROM node:alpine as build 

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN pnpm install

# Копируем все файлы проекта
COPY . .
RUN pnpm build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000

# Запуск фронтенда
CMD ["nginx", "-g", "daemon off;"]
