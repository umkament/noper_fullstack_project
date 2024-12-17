import PostModel from '../models/post.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';



export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();
    console.log('Received posts:', posts);

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: 'Неверный идентификатор статьи',
      });
    }
    const objectId = new ObjectId(postId)

    const doc = await PostModel.findOneAndUpdate(
      { _id: objectId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' }
    ).populate('user');

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Не удалось вернуть статью',
    });
  }
};

export const getUserPosts = async (req, res)=>{
try{
const {userId} = req.params
if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
  return res.status(400).json({
    message: 'Неверный идентификатор пользователя',
  });
}
const objectId = new mongoose.Types.ObjectId(userId)
const posts = await PostModel.find({user: objectId}).exec()
if (!posts.length) {
  return res.status(200).json({
    posts: [], 
    message: 'у пользователя пока нет постов',
  });
}
res.json(posts)
}catch(err){
  console.error(err);
  res.status(500).json({
    message: 'Не удалось получить посты пользователя',
  });
}
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndDelete({ _id: postId });

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

        res.json({
          success: true,
        });
      
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const create = async (req, res) => {
  // try {
  //   console.log('body', req.body)
  //   console.log('file', req.file)

  //   const {title, text, tags} = req.body
  //   const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : []; 
  //   const imageUrl = req.file ? `/upload/${req.file.filename}` : '' // если файл существует(загружен), то сохраняем его в переменную как URL изображения (для БД)
    
  //   console.log('Обработанный imageUrl:', imageUrl);
  //   console.log('Обработанные tags:', tags ? tags.split(',') : []);
  //   console.log('Полученные данные:', { title, text, tags, imageUrl });

  //   const doc = new PostModel({
  //     title,
  //     text,
  //     imageUrl, //URL загруженного изображения
  //     tags: tagsArray,  /*.split(','),*/
  //     user: req.userId
  //   });

  //   console.log('Received imageUrl:', );

  //   const post = await doc.save();

  //   res.json(post);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json({
  //     message: 'Не удалось создать статью',
  //   });
  // }

    try {
      console.log('body', req.body)
      console.log('file', req.file)
  
      const {title, text, tags} = req.body
      if (!title || !text) {
        return res.status(400).json({
          message: 'Необходимо указать заголовок и текст статьи',
        });
      }

      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '' // если файл существует(загружен), то сохраняем его в переменную как URL изображения (для БД)
      
      console.log('Обработанный imageUrl:', imageUrl);
      console.log('Обработанные tags:', tags );
      console.log('Полученные данные:', { title, text, tags, imageUrl });
  
      const doc = new PostModel({
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl, //URL загруженного изображения
        tags: Array.isArray(tags) ? req.body.tags : [],  
        user: req.userId
      });
      console.log('Создание поста в MongoDB:', doc);
  
      const post = await doc.save();

      console.log('Успешное создание поста:', post);
  
      res.json(post);
    } catch (err) {
      console.log(err);
      console.error('Ошибка создания поста:', err);

      res.status(500).json({
        message: 'Не удалось создать статью',
      });
    }
  };

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags
        //tags: req.body.tags.split(','),
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить статью',
    });
  }
};

export const getPostByTags = async (req, res)=>{
  try {
    const { tags } = req.query; // Получаем массив тегов из query параметров
    const searchTags = tags ? tags.split(',') : []; // Преобразуем строку в массив

    const regexTags = searchTags.map(tag => new RegExp(tag, 'i')); // Создаем регулярные выражения для частичного совпадения
    const posts = await PostModel.find({
      tags: { $in: regexTags }, // Ищем, где хотя бы один тег совпадает
    });

    res.json(posts)
  } catch(error){
    console.error(error);
    res.status(500).json({ message: 'Не удалось выполнить поиск' });
  }
}
