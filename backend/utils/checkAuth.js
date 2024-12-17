// создаем утилитную функцию-посредник (подобие middleWare)
//функция будет решать, можно ли возвращать какую-то секретную информацию или нет

import jwt from 'jsonwebtoken';


export const checkAuth = (req, res, next) => {
  //парсим токен, исключаем слово Bearer, которое приходит в Insomnia
  //const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
  const token = req.cookies.token || (req.headers.authorization || '').replace(/Bearer\s?/, '');
  console.log('Token:', token); 
  if (token) {
    try {
      //расшифровываем токен
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded._id;
      next(); //передаем управление следующему middleware или маршруту
    } catch (e) {
      console.log('Ошибка авторизации:', e);
      return res.status(403).json({
        message: "no access"
      })
    }

  } else {
    console.log('Токен не найден');
    return res.status(403).json({
      message: "no access"
    })
  }
}


//функция возвращает статус аутентификации, для отрисовки приватных страниц
export const checkAuthStatus = (req, res)=>{
  const token = req.cookies?.token

  if (!token){
    return res.status(401).json({message: "пользователь не авторизован", authenticated: false})
  }

  try{
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    return res.json({authenticated: true})
  }catch(e){
    return res.status(401).json({message: e, authenticated: false})
  }
}

