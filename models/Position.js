const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const positionSchema = new scheme({
    name:{
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        ref: 'categories',
        type: scheme.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: scheme.Types.ObjectId
    }
});

module.exports = mongoose.model('positions', positionSchema);