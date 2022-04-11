const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');

//model
const { Todo } = require('../models/index')


exports.createTodo = catchAsync(async (req, res, next) => {
    const { content, dueDate, categoryId } = req.body;
    const todo = await Todo.create(
        {
            content: content,
            dueDate: dueDate,
            categoryId: categoryId

        }
    )
    res.status(201).send({
        status: 'success',
        data: todo
    });
})

// exports.createCategory = catchAsync(async (req, res, next) => {
//     const { categoryName } = req.body;
//     const category = await Category.create(
//         categoryName)
//     res.status(201).send({
//         status: 'success',
//         data: category
//     });
// })

// exports.getAllCategories = catchAsync(async (req, res, next) => {

//     const categories = await Category.findAll();
//     res.status(200).send({
//         status: 'success',
//         data: categories
//     });
// })