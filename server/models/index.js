const User = require("./user");
const Todo = require("./todo");
const Category = require("./category");

// table relationships
// User.hasMany(Todo);
// Todo.belongsTo(User);

Category.hasMany(Todo);
Todo.belongsTo(Category);



module.exports = { User, Todo, Category };
