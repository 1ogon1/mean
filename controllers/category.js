const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/error-handler');

module.exports.getAll = async (request, response) => {
    try {
        const categories = await Category.find({
            user: request.user.id
        });

        response.status(200).json(categories);
    } catch (e) {
        errorHandler(response, e);
    }
};

module.exports.getById = async (request, response) => {
    try {
        const category = await Category.findById(request.params.id);

        response.status(200).json(category);
    } catch (e) {
        errorHandler(response, e);
    }
};

module.exports.remove = async (request, response) => {
    try {
        await Category.remove({
            _id: request.params.id
        });
        await Position.remove({
            category: request.params.id
        });

        response.status(200).json({
            message: 'Категория успешна удалена'
        })
    } catch (e) {
        errorHandler(response, e);
    }
};

module.exports.create = async (request, response) => {
    try {
        console.log(request.user);
        const category = new Category({
            name: request.body.name,
            user: request.user.id,
            imageSrc: request.file ? request.file.path : ''
        });

        await category.save();

        response.status(201).json(category);
    } catch (e) {
        errorHandler(response, e);
    }
};


module.exports.update = async (request, response) => {
    try {
        const updated = {
            name: request.body.name
        };

        if (request.file) {
            updated.imageSrc = request.file.path;
        }
        const category = await Category.findOneAndUpdate({
            _id: request.params.id
        }, {
            $set: updated
        }, {
            new: true
        });

        response.status(200).json(category);
    } catch (e) {
        errorHandler(response, e);
    }
};
