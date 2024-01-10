
const mongoose = require('mongoose');


const UserImgSchema = mongoose.Schema({
    Img: {
       type: String,
       required: true
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   }
   });

   const UserImg =  mongoose.model('Image', UserImgSchema);
   module.exports = UserImg 