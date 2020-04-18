const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/error-handler');

module.exports.login = async (request, response) => {
    const candidate = await User.findOne({
        email: request.body.email
    });

    if (candidate) {
        if (bcrypt.compareSync(request.body.password, candidate.password)) {
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.secretKey, {expiresIn: 60 * 60});

            response.status(200).json({token: `Bearer ${token}`})
        } else {
            response.status(401).json({
                message: 'Пароль введен не правильно'
            });
        }
    } else {
        response.status(404).json({
            message: 'Пользователя с таким email не существует'
        });
    }
};

module.exports.register = async (request, response) => {
    const candidate = await User.findOne({
        email: request.body.email
    });

    if (candidate) {
        response.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой'
        });
    } else {
        const salt = bcrypt.genSaltSync(10);
        const user = new User({
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, salt)
        });

        try {
            await user.save();
            response.status(201).json(user);
        } catch (e) {
            errorHandler(response, e);
        }
    }
};
