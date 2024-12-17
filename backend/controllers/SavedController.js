import SavedModel from '../models/saved.js';

export const getSavedToUser = async (req, res) => {
  const userId = req.userId; // ID текущего пользователя из токена авторизации
  try {
    const userSaved = await SavedModel.find({ userId }); // Запрос к базе данных
    res.json(userSaved);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error });
  }
};

export const toggleSavedItem = async (req, res) => {
  const { type, itemId } = req.body; // Тип элемента (user или post) и его ID
  const userId = req.userId; // ID текущего пользователя из токена


  if (!type || !itemId) {
    return res.status(400).json({ message: 'Invalid request data' });
  } 

   try {
    const existingItem = await SavedModel.findOne({ userId, itemId, type });
    if (existingItem) {
      await SavedModel.deleteOne({ _id: existingItem._id });
      return res.json({ message: 'Item removed from saved' });
    }

    const newItem = new SavedModel({ userId, itemId, type });
    await newItem.save();
    res.json({ message: 'Item added to saved' });
  } catch (error) {
    console.error('Ошибка при переключении сохранения:', error);
    res.status(500).json({ message: 'Ошибка при переключении сохранения', error });
  }
};
