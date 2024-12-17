import {validationResult} from "express-validator";

//обработка ошибок валидации данных, переданных в http-запросе
export const handleValidationErrors = (req, res, next)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array())
  }
next()
}