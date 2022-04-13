import React, { useState, useRef } from "react";
import {
    Card,
    Button,
    Modal,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import TodoProxy from "../proxy/TodoProxy";

const Item = ({
    content,
    users,
    index,
    setCategory,
    setTodosOrder,
    categoryId,
    categoryNames,
    categoryName,
    setCategoryNames,
    setCategoryOrder,
}) => {
    const todoProxy = new TodoProxy();
    const [newContent, setNewContent] = useState(content.content);
    const [newDueDate, setNewDueDate] = useState(content.dueDate);
    const [newAssignedTo, setNewAssignedTo] = useState(content.assignedTo);

    const [showEditTodoModal, setShowEditTodoModal] = useState(false);
    const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false);

    const handleShowEditTodoModal = () => setShowEditTodoModal(true);
    const handleCloseEditTodoModal = () => setShowEditTodoModal(false);

    const handleShowDeleteTodoModal = () => setShowDeleteTodoModal(true);
    const handleCloseDeleteTodoModal = () => setShowDeleteTodoModal(false);

    // const handleMarkAsDone = () => {
    //       setCategory((category) => {
    //           category.filter((el) =>{
    //               el.category_name == ("Done" || "done")
    //               return el.id
    //           })
    //       })

    // }

    const handleSaveEditTodoModal = () => {
        todoProxy
            .updateTodo(
                content.id,
                newContent,
                newDueDate,
                newAssignedTo
            )
            .then(() => {
                setCategory((category) => {
                    return category.map((el) => {
                        if (el.id == categoryId) {
                            return {
                                ...el,
                                todos: el.todos.map((todo) => {
                                    if (todo.id == content.id) {
                                        return {
                                            ...todo,
                                            content: newContent,
                                            dueDate: newDueDate,
                                            assigned_to: newAssignedTo,
                                        };
                                    }
                                    return todo;
                                }),
                            };
                        }

                        return el;
                    });
                });
            })
            .catch((err) => {
                console.log("err update", err);
            });

        handleCloseEditTodoModal();
    };

    const handleSaveDeleteTodoModal = () => {
        todoProxy.deleteTodo(content.id).then(() => {
            setCategory((category) => {
                return category.map((el) => {
                    if (el.id == categoryId) {
                        return {
                            ...el,
                            todos: el.todos.filter((todo) => {
                                return todo.id != content.id;
                            }),
                        };
                    }
                    return el;
                });
            });
            setTodosOrder((todosOrder) => {
                return todosOrder.map((el, i) => {
                    if (i === index) {
                        return el.filter((todoId) => {
                            return todoId != content.id;
                        });
                    }
                    return el;
                });
            });
        });

        handleCloseDeleteTodoModal();
        handleCloseEditTodoModal();
    };

    const handleSaveMarkAsDone = () => {
        todoProxy
            .markAsDone(
                content.id,
                newContent,
                newDueDate,
                newAssignedTo
            )
            .then((response) => {
                if (categoryNames.indexOf("DONE") == -1) {
                    todoProxy.createCategory("DONE", categoryNames.length).then((res) => {
                        setCategory((category) => {
                            const updatedOldCategory = category.map((el) => {
                                if (el.id == categoryId) {
                                    return {
                                        ...el,
                                        todos: el.todos.filter((todo) => todo.id != content.id),
                                    };
                                }
                                return el;
                            });

                            let newCategory = {
                                ...res.data.data,
                                todos: [response.data.data[1]],
                            };
                            return [...updatedOldCategory, newCategory];
                        });
                        setCategoryOrder((categoryOrder) => [
                            ...categoryOrder,
                            res.data.data.id,
                        ]);
                        setTodosOrder((todosOrder) => [...todosOrder, [content.id]]);
                        setCategoryNames([...categoryNames, "DONE"]);
                    });
                } else {
                    setCategory((category) => {
                        return category.map((el, idx) => {
                            if (el.id == categoryId) {
                                return {
                                    ...el,
                                    todos: el.todos.filter((x) => x.id != content.id),
                                };
                            } else if (idx == categoryNames.indexOf("DONE")) {
                                return {
                                    ...el,
                                    todos: [...el.todos, response.data.data[1]],
                                };
                            }

                            return el;
                        });
                    });
                    setTodosOrder((todosOrder) => {

                        return todosOrder.map((el, i) => {
                            if (i == categoryNames.indexOf(categoryName)) {

                                return el.filter((todoIds) => todoIds != content.id);
                            } else if (i == categoryNames.indexOf("DONE")) {
                                return [...el, content.id];
                            }
                            return el;
                        });
                    });
                }
            });

        handleCloseEditTodoModal();
    };

    return (
        <>
            <Modal show={showEditTodoModal} onHide={handleCloseEditTodoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Due Date"
                                autoFocus
                                value={newDueDate}
                                onChange={(e) => {
                                    setNewDueDate(e.target.value);
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
                                placeholder="Please type new content here..."
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select
                                onChange={(e) => {
                                    setNewAssignedTo(e.target.value);
                                }}
                                value={newAssignedTo}
                            >
                                <option>Choose</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.email}>
                                        {user.email}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleShowDeleteTodoModal}>
                        Delete
                    </Button>
                    <Button disabled={categoryName == "DONE"} variant="secondary" onClick={handleSaveMarkAsDone}>
                        Mark as Done
                    </Button>

                    <Button variant="primary" onClick={handleSaveEditTodoModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteTodoModal} onHide={handleCloseDeleteTodoModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will delete this todo!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteTodoModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveDeleteTodoModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Draggable draggableId={`item-${content.id}`} index={index}>
                {(provided) => (
                    <Card
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="my-2 shadow"
                    >
                        <div className={"border-start border-3 rounded"}>
                            <Card.Body>
                                <Card.Text>
                                    {content.content}
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip>{content.assignedTo}</Tooltip>}
                                    >
                                        <Button size="sm" style={{ float: "right" }}>
                                            <i className="bi bi-person-fill"></i>
                                        </Button>
                                    </OverlayTrigger>
                                </Card.Text>
                                <hr></hr>
                                <Card.Text className="d-flex justify-content-between align-items-center">
                                    <small className="text-muted">
                                        Due Date:{" "}
                                        {new Date(content.dueDate).toLocaleString("en", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </small>
                                    <Button
                                        onClick={handleShowEditTodoModal}
                                        variant="primary"
                                        size="sm"
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                    </Button>
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </Card>
                )}
            </Draggable>
            {/* <Card style={{ "height": "", "display": "flex", "margin": "0.1rem" }}>
                <Card.Body>
                    <Card.Text>
                        {content.content}
                        <OverlayTrigger

                            placement="top"
                            overlay={
                                <Tooltip >
                                    <ul>

                                    </ul>
                                </Tooltip>
                            }
                        >
                            <Button size='sm' style={{ "float": "right" }} >
                                <i class="bi bi-person-fill"></i>

                            </Button>
                        </OverlayTrigger>







                    </Card.Text>
                    <hr></hr>
                    <Card.Text>
                        <Button onClick={handleShowEditTodoModal} variant="primary" size='sm' style={{ "float": "right" }}>
                            <i class="bi bi-pencil-fill"></i>
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card> */}
        </>
    );
};

export default Item;
