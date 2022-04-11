const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const { sampledb } = require('../models/db')


//models
const { User } = require("../models");


// login with mail and password
exports.loginWithEmailAndPassword = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || password.trim() === "" || email.trim() === "") {
        return next(new AppError(400, "Email veya Şifreyi Eksik Girdiniz"));
    };

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
        return next(new AppError(400, "Email veya Şifre Hatalı"));
    };


    var isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError(400, "Kullanıcı Email veya Şifre Hatalı"));
    };
    var token = jwt.sign(
        { email: email },
        process.env.PRIVATE_KEY,

    );
    const authenticatedUser = await User.update(
        {
            web_token: token,
        },
        {
            where: { id: user.id },
            returning: true,
            plain: true,
        }
    );
    res.status(200).send({
        status: "success",
        token: authenticatedUser[1].dataValues.web_token,
    });
})