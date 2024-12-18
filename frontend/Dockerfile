# frontend Dockerfile

# Используем Node.js образ
FROM node:16 AS build 

WORKDIR /app


COPY package*.json ./
RUN npm install

# Копируем все файлы проекта
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM nginx:stable-alpine

# Копируем собранный фронтенд
COPY --from=build /app/build /usr/share/nginx/html
# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
  
# Запуск фронтенда
CMD ["nginx", "-g", "daemon off;"]


