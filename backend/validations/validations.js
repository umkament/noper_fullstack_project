import {body} from 'express-validator'

export const registerValidation = [
  body('name', 'enter name').isLength({min: 2}),
  body('surname', 'enter surname').isLength({min: 2}),
  body('username', 'enter username').isLength({min: 2}),
  body('email', 'invalid email format').isEmail(),
  body('password', 'password must contain at least 5 characters').isLength({min: 5}),
  //body('avatarUrl', 'wrong avatar link').optional().isURL(),
  //body('dateOfBirth', 'wrong date of birth').optional().isDate()
]
export const loginValidation = [
  body('email', 'invalid email format').isEmail(),
  body('password', 'password must contain at least 5 characters').isLength({min: 5}),
]

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({ min: 1 }).isString(),
  body('text', 'Введите текст статьи').isLength({ min: 1 }).isString(),
  body('tags', 'Неверный формат тэгов').optional().isArray(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];


