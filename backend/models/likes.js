import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Кто лайкнул
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Что лайкнул (ID статьи, комментария или пользователя)
    targetType: { type: String, required: true }, // Тип лайкаемого объекта (например, 'Post', 'Comment', 'User')
  },
  {timestamps: true, }
);
  
  export default mongoose.model('Like', likeSchema);
  