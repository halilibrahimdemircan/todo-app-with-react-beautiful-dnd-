import React, { useState, useEffect, useRef } from "react";
import TodoProxy from "../proxy/TodoProxy";
import Category from "../components/Category";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Homepage = () => {
    const todoProxy = new TodoProxy();
    const [category, setCategory] = useState([]);
    const [users, setUsers] = useState([]);
    const [categoryName, setcategoryName] = useState("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [categoryOrder, setCategoryOrder] = useState([]);
    const [todosOrder, setTodosOrder] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);

    const handleShowAddCategoryModal = () => setShowAddCategoryModal(true);
    const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);

    const handleSaveAddCategoryModal = () => {
        todoProxy
            .createCategory(categoryName, categoryOrder.length)
            .then((res) => {
                setCategory([...category, res.data.data]);
                setCategoryOrder([...categoryOrder, res.data.data.id]);
                setTodosOrder([...todosOrder, []]);
                setShowAddCategoryModal(false);
                setCategoryNames([...categoryNames, categoryName]);
            })
            .catch((err) => {
                console.log(err);
                setShowAddCategoryModal(false);
            });
    };

    const getAllUsers = () => {
        todoProxy.getUsers().then((res) => {
            setUsers(res.data.data);
        });
    };

    const [loading, setLoading] = useState(false);
    // getting all categories from db
    const getAllCategories = () => {
        setLoading(true);
        todoProxy
            .getAllCategories()
            .then((res) => {
                setCategory(res.data.data);
                setCategoryOrder(() => {
                    return res.data.data.map((el) => {
                        return el.id;
                    });
                });
                setTodosOrder(() => {
                    return res.data.data.map((el) => {
                        return el.todos.sort((a, b) => a.todos_order - b.todos_order).map((elm) => {
                            return elm.id;
                        });
                    });
                });
                setCategoryNames(() => {
                    return res.data.data.map((el) => {
                        return el.category_name;
                    });
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const handleDragEnd = (result) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        if (type === "column") {
            const items = [...category];
            const [removedItem] = items.splice(result.source.index, 1);
            items.splice(destination.index, 0, removedItem);
            setCategory(items);

            const catOrders = [...categoryOrder];
            const [removedOrder] = catOrders.splice(result.source.index, 1);
            catOrders.splice(destination.index, 0, removedOrder);
            setCategoryOrder(catOrders);

            const todoOrders = [...todosOrder];

            return;
        }

        const sourceCategoryIndex = category.findIndex((el) => {
            return el.id == source.droppableId.split("-")[1];
        });
        const destinationCategoryIndex = category.findIndex((el) => {
            return el.id == destination.droppableId.split("-")[1];
        });

        setCategory((category) => {
            let item = category[sourceCategoryIndex].todos[source.index];
            category[sourceCategoryIndex].todos.splice(source.index, 1);
            if (!!category[destinationCategoryIndex].todos) {
                category[destinationCategoryIndex].todos.splice(
                    destination.index,
                    0,
                    item
                );
            } else {
                category[destinationCategoryIndex].todos = [item];
            }
            return [...category];
        });
        setTodosOrder((todosOrder) => {

            let item = todosOrder[sourceCategoryIndex][source.index];

            let newSourceTodoOrder = [...todosOrder[sourceCategoryIndex]];
            newSourceTodoOrder.splice(source.index, 1);
            if (sourceCategoryIndex == destinationCategoryIndex) {
                newSourceTodoOrder.splice(destination.index, 0, item);
                return todosOrder.map((el, index) => {
                    if (index == sourceCategoryIndex) {
                        return newSourceTodoOrder;
                    } else {
                        return el;
                    }
                });
            } else {
                const newDestinationTodoOrder = [
                    ...todosOrder[destinationCategoryIndex],
                ];
                newDestinationTodoOrder.splice(destination.index, 0, item);
                return todosOrder.map((el, index) => {
                    if (index == sourceCategoryIndex) {
                        return newSourceTodoOrder;
                    } else if (index == destinationCategoryIndex) {
                        return newDestinationTodoOrder;
                    } else {
                        return el;
                    }
                });
            }

        });
    };
    useEffect(() => {
        todoProxy.changeTodosOrder(todosOrder, categoryOrder);
    }, [todosOrder]);

    useEffect(() => {
        if (categoryOrder.length > 0) {
            todoProxy.changeCategoryOrder(categoryOrder);
        }
    }, [categoryOrder]);

    useEffect(() => {
        getAllCategories();
        getAllUsers();
    }, []);

    return (
        <>
            <Modal show={showAddCategoryModal} onHide={handleCloseAddCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Please type content here..."
                                onChange={(e) => setcategoryName(e.target.value.toUpperCase())}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddCategoryModal}>
                        Close
                    </Button>

                    <Button
                        disabled={
                            categoryNames.filter((catName) => categoryName == catName)
                                .length > 0
                        }
                        variant="primary"
                        onClick={handleSaveAddCategoryModal}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button
                variant="outline-light"
                onClick={handleShowAddCategoryModal}
                className="m-5"
                style={{}}
            >
                New Category
            </Button>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                    direction="horizontal"
                    type="column"
                    droppableId="droppable-main"
                >
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ height: "80vh" }}
                            className="d-flex flex-nowrap overflow-auto"
                        >
                            {category?.map((cat, index) => {
                                return (
                                    <Category
                                        key={cat.id}
                                        content={cat}
                                        users={users}
                                        index={index}
                                        setTodosOrder={setTodosOrder}
                                        setCategory={setCategory}
                                        categoryNames={categoryNames}
                                        setCategoryNames={setCategoryNames}
                                        setCategoryOrder={setCategoryOrder}
                                    />
                                );
                            })}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default Homepage;
