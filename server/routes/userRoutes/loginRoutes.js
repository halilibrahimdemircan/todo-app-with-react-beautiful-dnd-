const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/loginController');


router

    .post("/", loginController.loginWithEmailAndPassword)
// .patch("/:id", userController.updateUserById)
// .delete("/:id", userController.deleteUserById)

module.exports = router;