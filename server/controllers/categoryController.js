const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/AppError');
const { sampledb } = require('../models/db');

//model
const { Category, Todo } = require('../models/index');
const { updateUserById } = require('./userController');
const category = require('../models/category');

exports.createCategory = catchAsync(async (req, res, next) => {
    const { categoryName, categoryOrder } = req.body;
    const category = await Category.create(
        {
            category_name: categoryName,
            category_order: (categoryOrder + 1)
        })
    res.status(200).send({
        status: 'success',
        data: category
    });
})

exports.getAllCategories = catchAsync(async (req, res, next) => {

    const categories = await Category.findAll(
        {
            order: [['category_order', 'ASC']],
            include: [
                {
                    model: Todo, order: [['todos_order', 'ASC']]
                }
            ]
        }
    );
    res.status(200).send({
        status: 'success',
        data: categories
    });
})

exports.updateCategoryOrder = catchAsync(async (req, res, next) => {
    const { categoryOrders } = req.body;
    console.log(categoryOrders, "categoryOrders");
    let query = ""
    categoryOrders.map((el, index) => {
        query += `update category set category_order = ${index + 1} where id = ${el}; `
    })

    await sampledb.query(query)
})


