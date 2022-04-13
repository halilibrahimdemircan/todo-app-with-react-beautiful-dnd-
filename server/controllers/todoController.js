const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/AppError");
const { sampledb } = require("../models/db");

console.log("hello from todoController.js");

//model
const { Todo } = require("../models/index");

exports.createTodo = catchAsync(async (req, res, next) => {
    const { assignedTo, content, dueDate, categoryId, todoOrder } = req.body;
    const todo = await Todo.create({
        assignedTo: assignedTo,
        content: content,
        dueDate: dueDate,
        categoryId: categoryId,
        todos_order: todoOrder,
    });
    res.status(201).send({
        status: "success",
        data: todo,
    });
});

exports.updateTodosOrder = catchAsync(async (req, res, next) => {
    const { todosOrder, categoryOrder } = req.body;
    console.log(todosOrder, "todosOrder", categoryOrder, "categoryOrder");
    let query = "";
    todosOrder?.map((el, index) => {
        el?.map((el2, index2) => {
            query += `update todo set todos_order = ${index2 + 1}, category_id = ${categoryOrder[index]
                } where id = ${el2};`;
        });
    });
    await sampledb.query(query);

    res.status(201).send({
        status: "success",
    });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
    const { todoId } = req.params;

    const { assignedTo, content, dueDate } = req.body;
    let newDueDate = dueDate.split("T")[0];
    console.log(assignedTo, content, newDueDate, "assignedTo, content, dueDate");

    Todo.update(
        {
            assignedTo: assignedTo,
            content: content,
            dueDate: newDueDate,
        },
        {
            where: {
                id: todoId,
            },
            returning: true,
            plain: true,
        }
    ).then((result) => {
        let updatedTodo = result[1].dataValues;
        // console.log(result[1].dataValues, "responseupdate");
        res.status(200).send({
            status: "success",
            data: updatedTodo,
        });
    });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
    const { todoId } = req.params;
    const todo = await Todo.findByPk(todoId);

    await todo.destroy();
    res.status(204).send({
        status: "success",
        data: null,
    });
});
exports.markTodoAsDone = catchAsync(async (req, res, next) => {
    const { todoId } = req.params;
    const { assignedTo, content, dueDate } = req.body;
    let newDueDate = dueDate.split("T")[0];

    const data = await Todo.update(
        {
            isCompleted: true,
            assignedTo: assignedTo,
            content: content,
            dueDate: newDueDate,
        },
        {
            where: {
                id: todoId,
            },
            returning: true,
            plain: true
        },

    );
    res.status(200).send({
        status: "success",
        data: data,
    });
});

// router.patch("/update/:id", catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const { newCategoryName } = req.body;
//     if (!newCategoryName || !newCategoryName.length || !id) {
//         return res.send({ message: "Kategori ismi ve kategori ID boş olamaz" });
//     }
//     Category.update(
//         { category_name: newCategoryName },
//         { where: { id: id } }
//     ).then((response) => {
//         res.send(response);
//     });
// }));
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
