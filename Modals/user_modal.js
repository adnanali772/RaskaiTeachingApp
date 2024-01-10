const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher', 'student'],
        default: 'student'
    }
});

UserSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}


UserSchema.pre('save', async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



UserSchema.pre('findOneAndUpdate', async function (next) {
    const updateData = this.getUpdate();
    if (updateData.password) {
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    next();
});

const user = new mongoose.model('User', UserSchema);


module.exports = user 