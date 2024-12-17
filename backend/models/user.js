import mongoose from 'mongoose';

//созданная схема при создании любого пользователя должна прикрутить дату создания и обновления этой сущности

const UserSchema = new mongoose.Schema({
     name: {
       type: String,
       required: true
     },
     surname: {
      type: String,
       required: true
     },
     username: {
       type: String,
       unique: true,
       required: true
     },
     email: {
       type: String,
       unique: true,
       required: true
     },
     passwordHash: {
       type: String,
       required: true
     },
     avatarUrl: String,
     dateOfBirth: Date,
     address: {
       country: String,
       zipcode: String,
       city: String,
       street: String,
       home: String
     },
     phoneNumber: String,
     description: String,
     sportType: String,
     link: String
   },
   {
     timestamps: true
   })


// далее говорим, что созданную нами схему юзера необходимо экспортировать

export default mongoose.model('User', UserSchema)