import React, { useState, useRef } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import Item from "./Item";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TodoProxy from "../proxy/TodoProxy";

const Category = ({
    content,
    users,
    index,
    setTodosOrder,
    setCategory,
    categoryNames,
    setCategoryNames,
    setCategoryOrder,
}) => {
    const todoProxy = new TodoProxy();

    const contentRef = useRef();
    const [dueDate, setDueDate] = useState("");
    const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");

    const handleShowCreateTodoModal = () => setShowCreateTodoModal(true);
    const handleCloseCreateTodoModal = () => setShowCreateTodoModal(false);

    const handleSaveCreateTodoModal = () => {
        todoProxy
            .createTodo(
                assignedTo,
                contentRef.current.value,
                dueDate,
                content.id,
                content.todos ? content.todos.length : 1
            )
            .then((res) => {
                setCategory((category) => {
                    return category.map((el) => {
                        if (el.id === content.id) {
                            return {
                                ...el,
                                todos: el.todos
                                    ? [...el.todos, res.data.data]
                                    : [res.data.data],
                            };
                        }
                        return el;
                    });
                });
                setTodosOrder((todosOrder) => {
                    return todosOrder.map((el, i) => {
                        if (i === index) {
                            return [...el, res.data.data.id];
                        }
                        return el;
                    });
                });

                setShowCreateTodoModal(false);
            })
            .catch((err) => {
                console.log(err);
                setShowCreateTodoModal(false);
            });
    };

    return (
        <>
            <Modal show={showCreateTodoModal} onHide={handleCloseCreateTodoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Due Date"
                                autoFocus
                                onChange={(e) => {
                                    setDueDate(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Please type content here..."
                                ref={contentRef}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    setAssignedTo(e.target.value);
                                }}
                            >
                                <option>Choose</option>
                                {users?.map((user) => (
                                    <option key={user.id} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateTodoModal}>
                        Close
                    </Button>

                    <Button variant="primary" disabled={!dueDate || !assignedTo} onClick={handleSaveCreateTodoModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Draggable draggableId={`cat-${content.id}`} index={index}>
                {(provided) => (
                    <div style={{ height: "min-content", minWidth: "350px" }}>
                        <Card
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            className="shadow-sm m-3 inline-flex "
                        >
                            <Card.Header className="d-flex justify-content-between">
                                <span>{content.category_name}</span>
                                <i className="bi bi-chevron-left"></i>
                            </Card.Header>
                            <Card.Body
                                style={{ maxHeight: "70vh", overflowY: "auto" }}
                            >
                                <Droppable
                                    droppableId={`category-${content.id ? content.id : 0}`}
                                    type="todo"
                                >
                                    {(provided) => (
                                        <div
                                            className="d-flex flex-column border border-white overflow-auto"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {content.todos?.map((todo, idx) => (
                                                <Item
                                                    key={todo.id}
                                                    content={todo}
                                                    index={idx}
                                                    users={users}
                                                    setCategory={setCategory}
                                                    setTodosOrder={setTodosOrder}
                                                    categoryId={content.id}
                                                    categoryName={content.category_name}
                                                    categoryNames={categoryNames}
                                                    setCategoryNames={setCategoryNames}
                                                    setCategoryOrder={setCategoryOrder}

                                                // columnId={props.column.id}
                                                // state={props.state}
                                                // setState={props.setState}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button
                                    onClick={handleShowCreateTodoModal}
                                    variant="primary"
                                    size="sm"
                                >
                                    New Todo
                                    <span className="m-2">
                                        <i className="bi bi-plus-square"></i>
                                    </span>
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>
                )}
            </Draggable>
        </>
    );
};

export default Category;
