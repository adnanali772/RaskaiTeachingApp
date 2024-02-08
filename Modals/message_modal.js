
const mongoose = require('mongoose');


const UserMessageSchema = mongoose.Schema({
    message: {
       type: String,
       required: true
    },
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
   },
   createdAt: {
    type: Date,
    default: Date.now
}
   });

   const UserMessage =  mongoose.model('UserMessage', UserMessageSchema);
   module.exports = UserMessage 