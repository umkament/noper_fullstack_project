# frontend Dockerfile

# Используем Node.js образ
FROM node:alpine as build 


COPY package.json pnpm-lock.yaml ./
RUN npm install

# Копируем все файлы проекта
COPY . .
RUN npm run build

FROM nginx:stable-alpine

# Копируем собранный фронтенд
COPY --from=build /dist /usr/share/nginx/html

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
  
# Запуск фронтенда
CMD ["nginx", "-g", "daemon off;"]


