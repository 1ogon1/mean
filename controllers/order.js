const Order = require('../models/Order');
const errorHandler = require('../utils/error-handler');

module.exports.getAll = async (request, response) => {
    try {
        const selector = {
            user: request.user.id
        };

        if (request.query.start) {
            selector.date = {
                $gte: request.query.start
            }
        }

        if (request.query.end) {
            if (!selector.date) {
                selector.date = {};
            }
            selector.date['$lte'] = request.query.end;
        }

        if (request.query.order) {
            selector.order = +request.query.order;
        }

        const orders = await Order
            .find(selector)
            .sort({date: -1})
            .skip(+request.query.offset)
            .limit(+request.query.limit);

        response.status(200).json(orders);
    } catch (e) {
        errorHandler(response, e);
    }
};

module.exports.create = async (request, response) => {
    try {
        const lastOrder = await Order.findOne({
            user: request.user.id
        }).sort({
            date: -1
        });
	    console.log("lastOrder", lastOrder);
        const order = await new Order({
            order: (lastOrder ? lastOrder.order : 0) + 1,
            list: request.body.list,
            user: request.user.id
        }).save();

        response.status(201).json(order);
    } catch (e) {
        errorHandler(response, e);
    }
};