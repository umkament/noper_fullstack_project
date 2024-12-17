import mongoose from 'mongoose';

const SavedSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  itemId: { type: String, required: true },
  type: { type: String, enum: ['post', 'user'], required: true },
});

export default mongoose.model('Saved', SavedSchema);
