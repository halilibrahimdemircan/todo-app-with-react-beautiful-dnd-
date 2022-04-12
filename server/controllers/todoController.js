const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sampledb } = require('../models/db');


//model
const { Todo } = require('../models/index')


exports.createTodo = catchAsync(async (req, res, next) => {
    const { assignedTo, content, dueDate, categoryId, todoOrder } = req.body;
    const todo = await Todo.create(
        {
            assignedTo: assignedTo,
            content: content,
            dueDate: dueDate,
            categoryId: categoryId,
            todos_order: todoOrder


        }
    )
    res.status(201).send({
        status: 'success',
        data: todo
    });
})

exports.updateTodosOrder = catchAsync(async (req, res, next) => {
    const { todosOrder } = req.body;
    console.log(todosOrder, "todosOrder");
    let query = "";
    todosOrder.map((el, index) => {

        el.map((el2, index2) => {
            query += `update todo set todos_order = ${index2 + 1} where id = ${el2}; `

        })
    })

    await sampledb.query(query);
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