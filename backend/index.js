import express, {json} from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {registerValidation, loginValidation, postCreateValidation} from "./validations/validations.js";
import {checkAuth, handleValidationErrors} from "./utils/index.js";
import {UserController, PostController, CommentController, LikeController} from "./controllers/index.js";

import * as path from "path";
import dotenv from 'dotenv';
import { checkAuthStatus } from './utils/checkAuth.js';
import { getPostByTags } from './controllers/PostController.js';
import { getSavedToUser, toggleSavedItem } from './controllers/SavedController.js';
//import path from 'path';
import { fileURLToPath } from 'url';

// Имитация __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4411

dotenv.config()

//делаем подключение к базе данных mongodb
//с помощью then проверяем, удалось ли нам подключиться
mongoose
   .connect(process.env.MONGODB_URI)
   .then(() => console.log('DB ok'))
   .catch((err) => console.log(' DB error', err))

//вызывая функцию express() - создается приложение
// вся логика express хранится в переменной app
const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb)=>{
//cb(null, path.resolve('./uploads'))
cb(null, path.join(__dirname, 'uploads'))
  },
  filename: (_, file, cb)=>{
    cb(null, file.originalname)
  }
})

const upload = multer({storage, 
  //проверка на тип файлов
  fileFilter: (_, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
  }
},})

const corsOptions = {
  origin: 'http://localhost:5173', // Замените на ваш фронтенд-URL
  //origin: 'https://umkament.github.io/noper_app_front/',
  credentials: true, // Разрешить отправку куков и токенов
  methods: 'GET,POST,PUT,DELETE,PATCH',
}

//указываем, что в приложении нужно использовать json из самого express
//благодаря этому наше приложение может читать json формат
app.use(express.json())
app.use(cors(corsOptions))
//app.use('/uploads', express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());


// если придет запрос на '/auth/register', тогда мы проверим этот запрос на валидацию, прописанную в registerValidation
// и если валидация проходит, то только после этого начнет выполняться колбэк функция

//регистрация, авторизация
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register )
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/logout', UserController.logout)
app.get('/auth/me', checkAuth, UserController.getMe)


//редактирование профиля
app.put('/edit/profile', checkAuth, UserController.updateUserProfile)
app.delete('/auth/avatar', checkAuth, UserController.deleteAvatar)
app.get('/auth/status', checkAuthStatus)
app.post('/upload', checkAuth, upload.single('image'), (req, res) =>{
  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed.' });
  }
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

//получение юзеров и их постов
app.get('/users', UserController.getAllUsers)
app.get('/user/:userId', UserController.getOneUser)
app.get('/user/:userId/posts', PostController.getUserPosts)

//посты: получение, создание, редактирование, удаление
 app.get('/posts', PostController.getAll)
 app.get('/post/:id', PostController.getOne)
 app.delete('/post/:id', checkAuth, PostController.remove)
 app.patch('/post/:id', checkAuth, postCreateValidation,handleValidationErrors, PostController.update)
 app.post('/post', checkAuth, postCreateValidation, (req, res, next) => {
  console.log('Запрос прошел аутентификацию и валидацию:', req.body);
  next();
}, PostController.create);
 app.post('/upload/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }
  const imageUrl = `/uploads/${req.file.originalname}`;
  res.json({ url: imageUrl });
});

//поиск постов по тегам
app.get('/posts/search', getPostByTags)

//комментарии: создание, получение, удаление
app.get('/comments/:postId', CommentController.getCommentsByPost)
app.post('/comment', checkAuth, CommentController.createComment)
app.delete('/comment/:commentId', checkAuth, CommentController.deleteComment)

//лайки: добавление и удаление, получение
app.post('/like/:targetId', checkAuth, LikeController.addDeleteLike)
app.get('/likes/:targetId', checkAuth, LikeController.getLikes)
app.post('/likes/bulk', checkAuth, LikeController.getLikesBulk)

//сохраненное: получение, добавление и удаление юзеров и статей
app.get('/saved', checkAuth, getSavedToUser);
app.post('/saved/toggle', checkAuth, toggleSavedItem);



//следующий код запускает непосредственно веб-сервер
// функция listen первым параметром принимает порт, а вторым (необязательным) функцию, в которой
// мы говорим: если наш сервер не смог запуститься, то мы вернем об этом сообщение
// если ошибки нет, то функция вернет сообщение 'server ok'

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('SERVER OK')
})

