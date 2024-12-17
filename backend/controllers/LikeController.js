import LikeModel from '../models/likes.js';


export const addDeleteLike = async (req, res) =>{
    const targetId = req.params.targetId;
    const userId = req.userId; 
    const targetType = req.body.targetType; // Тип сущности (например, 'Post', 'Comment', 'User')
  
    try {
      // Проверяем, есть ли уже лайк от этого пользователя
      const existingLike = await LikeModel.findOne({ user: userId, targetId, targetType });
  
      if (existingLike) {
        // Если лайк уже есть, удаляем его (дизлайк)
        await LikeModel.deleteOne({ _id: existingLike._id });
      } else {
        // Если лайка нет, создаем новый
        const newLike = new LikeModel({ user: userId, targetId, targetType });
        await newLike.save();
      }
  
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
}

export const getLikes = async (req, res) => {
    const targetId = req.params.targetId;
    const targetType = req.query.targetType;
    const userId = req.userId; 
  
    try {
      // Получаем количество лайков для сущности
      const likesCount = await LikeModel.countDocuments({ targetId, targetType });
  
      // Проверяем, лайкнул ли текущий пользователь
      const likedByUser = await LikeModel .exists({ user: userId, targetId, targetType });
  
      res.status(200).json({ likesCount, likedByUser });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }

  export const getLikesBulk = async (req, res) => {
    const { targetIds } = req.body; // Массив ID комментариев
    const targetType = req.query.targetType; // Тип сущности
    const userId = req.userId; // ID текущего пользователя
  
    try {
      // Получаем все лайки для заданных targetIds и targetType
      const likes = await LikeModel.find({ targetId: { $in: targetIds }, targetType });
  
      // Формируем структуру данных: { [targetId]: { likedByUser, likesCount } }
      const result = targetIds.reduce((acc, id) => {
        const filteredLikes = likes.filter(like => like.targetId.toString() === id);
        acc[id] = {
          likesCount: filteredLikes.length,
          likedByUser: filteredLikes.some(like => like.user.toString() === userId),
        };
        return acc;
      }, {});
  
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

    
  





