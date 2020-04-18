const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const categorySchema = new scheme({
    name:{
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: scheme.Types.ObjectId
    }
});

module.exports = mongoose.model('categories', categorySchema);