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

exports.getUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});

const test = async () => {
    try {
        //     const user = await sampledb.query(`
        //     INSERT INTO post 
        // (title, content, image, created_at, updated_at)
        // VALUES 
        // ('durmuş', 2, 'dd@gmail.com', 1, Now()) 
        // `);

        console.log("uuuu", user);

    } catch (err) {
        throw new AppError(500, err.message, err.name || "Error", false, err.stack)
    }
}

exports.createUser = catchAsync(async (req, res, next) => {

    await test();
    // const user = await sampledb.query(`
    // INSERT INTO post 
    // (title, content, image, created_at, updated_at)
    // VALUES 
    // ('durmuş', 2, 'dd@gmail.com', 1, Now()) 
    // `);
    // console.log(user, "aaaaaaaa");
    // if mail is already registered
    // return next(new AppError('This email has alredy been taken!', 400))
    // await User.create(req.user.id, { active: false });
    res.status(204).send({
        status: 'success',
        data: null
    });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
    res.status(204).send({
        status: 'success',
        data: null
    });
});