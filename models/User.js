const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const userSchema = new scheme({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);