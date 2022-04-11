const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//models
const { User } = require("../models");

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, "email");

    if (!email || !password || password.trim() === "" || email.trim() === "") {
        return next(new AppError(400, "Lütfen tüm alanları doldurunuz"));
    };

    const users = await User.findAll({ where: { email: email } });

    if (users.length === 0) {
        if (email !== "" && password !== "") {
            var token = jwt.sign(
                { email: email },
                process.env.PRIVATE_KEY,

            );
            const newUser = await User.create({
                email: email,
                password: bcrypt.hashSync(password, 8),
                web_token: token,
            });

            console.log(newUser, "newUser");
            res.status(200).send({
                status: "success",
                token: newUser.dataValues.web_token,
            });
        }
    } else {
        return next(new AppError(400, "Bu email adresi zaten kullanılıyor"));
    }


})

