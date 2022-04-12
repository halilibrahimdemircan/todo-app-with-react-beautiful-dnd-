import Repository from "./Repository";


export default class TodoProxy {

    getAllCategories() {
        return Repository.get("http://localhost:8000/api/category")

    }

    getUsers() {
        return Repository.get("http://localhost:8000/api/users")
    }

    createCategory(categoryName, categoryOrder) {
        return Repository.post("http://localhost:8000/api/category", {
            categoryName,
            categoryOrder
        })
    }


    createTodo(assignedTo, content, dueDate, categoryId, todoOrder) {
        return Repository.post("http://localhost:8000/api/todo", {
            assignedTo: assignedTo,
            content: content,
            dueDate: dueDate,
            categoryId: categoryId,
            todoOrder: todoOrder
        })
    }

    changeCategoryOrder(categoryOrders) {
        return Repository.post("http://localhost:8000/api/category/order", {
            categoryOrders
        })
    }

    changeTodosOrder(todosOrder) {
        console.log(todosOrder, "todosOrder");
        return Repository.post("http://localhost:8000/api/todo/order", {
            todosOrder
        })
    }

    updateTodo(todoId, content, dueDate, assignedTo) {
        console.log(todoId, content, dueDate, assignedTo);
        return Repository.patch(`http://localhost:8000/api/todo/${todoId}`, {

            content: content,
            dueDate: new Date(dueDate),
            assignedTo: assignedTo
        })
    }




}