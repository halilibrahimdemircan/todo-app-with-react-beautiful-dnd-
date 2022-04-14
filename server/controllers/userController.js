const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sampledb } = require('../models/db')

const { User } = require('../models')


exports.getUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll();
    res.status(200).send({
        status: 'success',
        data: users
    });
});

