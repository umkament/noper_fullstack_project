import CommentModel from '../models/comment.js';
import PostModel from '../models/post.js'

//создание комментария
export const createComment = async (req, res)=>{
    try{
        //проверяем авторизован ли пользователь
        if (!req.userId) { // Проверьте, авторизован ли пользователь
            return res.status(403).json({ message: 'no access' });
          }
        const { text, postId} = req.body
//создаем комментарий
        const comment = new CommentModel({
            text,
            user: req.userId,
            post: postId
        })
//сохраняем в базу данных
        const savedComment = await comment.save()
//подтягиваем данные о пользователе через populate
const populatedComment = await savedComment.populate('user', 'username avatarUrl');

//отправляем на клиент сохраненный и дополненный данными комментарий
        res.json(populatedComment)

    } catch(err){
console.error(err)
res.status(500).json({message: 'Не удалось создать комментарий'})
    }
}


//получение комментариев для поста

export const getCommentsByPost = async (req, res)=>{
    try{
const {postId} = req.params
const comments = await CommentModel.find({post: postId}).populate('user', 'username avatarUrl');
res.json(comments)

    }catch (err){
        console.error(err)
        res.status(500).json({message: 'Не удалось получить комментарии'})
    }
}


//удаление комментария

// export const deleteComment = async (req, res)=>{
//     try{
//         console.log('Запрос:', req);
//         const {commentId} = req.params
//         console.log('Запрос на удаление комментария с ID:', commentId);
//         const userId = req.userId

//         //находим комментарий
//         const comment = await CommentModel.findById(commentId)
//         if (!comment){
//            return res.status(404).json({message: 'Комментарий не найден'})
//         }
// //проверяем, является ли пользователь автором комментария или автором поста
// const post = await PostModel.findById(comment.post)
// console.log('Найденный пост:', post);

// if (comment.user.toString() !== userId && post.user.toString() !== userId){
//     return res.status(403).json({message: 'нет прав на удаление этого комментария'})
// }

// //удаляем комментарий
// await CommentModel.findByIdAndDelete(commentId)

//         res.json({message: 'Комментарий успешно удален', commentId})

//     }catch(err){
//         console.error(err)
//         res.status(500).json({message: 'Не удалось удалить комментарий'})
//     }

// }

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;

        // Логируем входные данные
        console.log('Запрос на удаление комментария с ID:', commentId);

        // Находим комментарий
        const comment = await CommentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        // Находим пост для проверки прав
        const post = await PostModel.findById(comment.post);
        console.log('Найденный пост:', post);

        // Проверяем права пользователя
        if (comment.user.toString() !== userId && post.user.toString() !== userId) {
            return res.status(403).json({ message: 'Нет прав на удаление этого комментария' });
        }

        // Удаляем комментарий
        await CommentModel.findByIdAndDelete(commentId)

        return res.json({ message: 'Комментарий успешно удален' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Не удалось удалить комментарий' });
    }
};
