import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
text: {type: String,required: true},
user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
post: {type: mongoose.Schema.Types.ObjectId,ref: 'Post',required: true},
likes: {type: Number,default: 0}
},
{timestamps: true, }// Автоматически добавляем createdAt и updatedAt
)

  export default mongoose.model('Comment', CommentSchema)