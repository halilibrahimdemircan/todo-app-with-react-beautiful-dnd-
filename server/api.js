const api = require("express").Router();
const userRoutes = require("./routes/userRoutes/userRoutes");
const loginRoutes = require('./routes/userRoutes/loginRoutes');
const registerRoutes = require('./routes/userRoutes/registerRoutes');
const categoryRoutes = require('./routes/categoryRoutes/categoryRoutes');
const todoRoutes = require('./routes/todoRoutes/todoRoutes');

api.get("/", (req, res) => {
    res.send({ message: "Hello from server!" });
})
api.use('/users', userRoutes);
api.use('/login', loginRoutes);
api.use('/register', registerRoutes);
api.use('/category', categoryRoutes);
api.use('/todo', todoRoutes);



module.exports = api;