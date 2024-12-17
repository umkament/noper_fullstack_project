import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

import {validationResult} from "express-validator";
import UserModel from "../models/user.js"

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().exec();
    console.log('Received users:', users);

    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить пользователей',
    });
  }
};
export const getOneUser = async (req, res) =>{
  try{
  const {userId} = req.params
if (!userId || !ObjectId.isValid(userId)){
  return res.status(400).json({
    message: 'Неверный идентификатор пользователя'
  })
}
const objectId = new ObjectId(userId)

  const user = await UserModel.findById(objectId).exec()
  if (!user){
    return res.status(404).json({message: "Пользователь не найден"})
  }
  console.log('Received user:', user)
  res.json(user)
} catch (err){
  console.log(err);
  res.status(500).json({
    message: 'Не удалось получить пользователя',
})
}
}
 
export const register = async (req, res) => {
  try {
    //вынесли указанный код в утилитную функцию handleValidstionErrors
    /*//..1.. после того, как информация прошла валидацию , ее нужно спарсить, для проверки ошибок используем функцию
    //поэтому в переменную errors мы хотим получить все ошибки validationResult
    // передав в функцию validationResult req, мы говорим, что хотим получить все, что пришло в запросе
    const errors = validationResult(req)
    // если ошибки не пустые (или если ошибка существует) , то верни статус 400 - неверный запрос, и все ошибки, которые получилось провалидировать
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array())
    }*/



    //..2..
    const password = req.body.password
    //генерируем алгоритм шифрования пароля
    const salt = await bcrypt.genSalt(10)
    //создаем переменную в которую попадет зашифрованный пароль
    //с помощью bcrypt и функции hash передаем открытый пароль(password) и алгоритм(salt) по которому пароль будет зашифрован
    const hash = await bcrypt.hash(password, salt)

    //..3.. готовим документ на создание пользователя с помощью mongo DB
    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      avatarUrl: req.body.avatarUrl
    });

    //..4.. создаем пользователя в базе данных
    const user = await doc.save();

    //1. если нет ошибок, 2. пароль зашифрован, 3. создан документ и 4. сохранен в DB
    //после этого создаем токен, в объект помещаем информацию, которая подлежит шифрованию
    //третий параметр у sign - это срок жизни токена

    const token = jwt.sign({
         _id: user._id
       },
       process.env.SECRET_KEY,
       {
         expiresIn: '30d'
       }
    )

    //исключим свойство password из объекта user, чтобы оно не приходило в res

    const {passwordHash, ...userData} = user._doc

//  возвращаем информацию о пользователе в виде json и токен
    res.json({
      ...userData,
      token
    })

  } catch (err) {
    console.log(err) //конкретную ошибку выводим для себя в консоль
// возвращаем пользователю ответ, с указанием статуса ошибки
if (err.code === 11000) {
  // Ошибка уникальности
  const errorField = Object.keys(err.keyPattern)[0];
  return res.status(400).send({ 
    errorField, 
    message: `${errorField === 'username' ? 'подобный Ник' : 'подобный e-mail'} уже существует` 
  });
}
    res.status(500).json({
      message: "failed to register"
    })
  }
}
export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) {
      res.status(404).json({
        message: "user is not found"
      })
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isValidPass) {
      res.status(400).json({
        message: "incorrect email or password"
      })
    }
    const token = jwt.sign({
         _id: user._id
       },
       process.env.SECRET_KEY,
       {
         expiresIn: '30d'
       }
    )

    console.log('Generated token:', token); 

    // Установка cookies с токеном
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      //secure: true,
      //secure: process.env.NODE_ENV === 'production', // Использовать только HTTPS в продакшене
     sameSite: 'Lax', // для кросс-доменных запросов (если https то "None")
     //sameSite: 'None',
      //maxAge: 3600000, // Время жизни cookies (1 час)
    });

    const {passwordHash, ...userData} = user._doc

   return res.json({
      ...userData,
      token
    })
  } catch (err) {
    console.log(err)


    return res.status(500).json({
      message: "failed to login"
    })
  }
}
export const getMe = async (req, res) => {
  try {
    // производим расшифровку токена в checkAuth
//ищем пользователя по id
    const user = await UserModel.findById(req.userId) 

    if (!user) {
      return res.status(404).json({
        message: "user is not found"
      })
    }

    const {passwordHash, ...userData} = user._doc

    res.json(userData)
  } catch (e) {
    return res.status(500).json({
      message: "no access"
    })
  }
}
export const logout = async (req, res)=>{
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    //secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    //secure: true,
    //sameSite: 'None'
  });
  return res.status(200).json({ message: 'Successfully logged out' });
}

export const updateUserProfile = async (req, res)=>{
  const userId = req.userId
  const {name, surname, username, email, avatarUrl, description, sportType, link} = req.body
try{
  console.log('Получение пользователя по id', userId)
const user = await UserModel.findById(userId)

  if (!user){
    console.log('пользователь не найден')
    return res.status(404).json({message: 'User not found'})
  }


  console.log('данные для обновления', {name, surname, username, email, avatarUrl, description, sportType, link})
  user.name = name || user.name
  user.surname = surname || user.surname
  user.username = username || user.username
  user.email = email || user.email
  user.avatarUrl = avatarUrl || user.avatarUrl
  user.description = description || user.description
  user.sportType = sportType || user.sportType
  user.link = link || user.link

  console.log('сохранение данных...')
  await user.save();
  console.log('профиль обновлен успешно')

    res.json({ message: 'Profile updated successfully', user });
} catch(err){
  console.log('ошибка при обновлении профиля', err)
res.status(500).json({message: 'Error updating profile', err: err.message, stack: err.stack})
}
}

export const deleteAvatar = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Удаляем аватар
    user.avatarUrl = '';

    await user.save();

    res.json({ message: 'Avatar deleted successfully', user });
  } catch (err) {
    console.error('Ошибка при удалении аватара', err);
    res.status(500).json({ message: 'Error deleting avatar', err: err.message, stack: err.stack });
  }
};









