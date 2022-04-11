const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController');


router

    .post("/", registerController.createUser)
// .patch("/:id", userController.updateUserById)
// .delete("/:id", userController.deleteUserById)

module.exports = router;