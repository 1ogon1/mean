const mongoose = require('mongoose');
const scheme = mongoose.Schema;

const orderSchema = new scheme({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity:{
                type: Number
            },
            cost: {
                type: Number
            }
        }
    ],
    user: {
        ref: 'users',
        type: scheme.Types.ObjectId
    }
});

module.exports = mongoose.model('orders', orderSchema);