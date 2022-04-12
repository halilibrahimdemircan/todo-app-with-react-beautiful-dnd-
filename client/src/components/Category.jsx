import React, { useState, useRef } from 'react'
import { Card, Button, Modal, Form } from "react-bootstrap"
import Item from "./Item";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TodoProxy from "../proxy/TodoProxy";



const Category = ({ content, users, index, setTodosOrder, setCategory }) => {
    const todoProxy = new TodoProxy();

    const contentRef = useRef();
    const [dueDate, setDueDate] = useState('');
    const [showCreateTodoModal, setShowCreateTodoModal] = useState(false)
    const [assignedTo, setAssignedTo] = useState("");




    const handleShowCreateTodoModal = () => setShowCreateTodoModal(true)
    const handleCloseCreateTodoModal = () => setShowCreateTodoModal(false)

    const handleSaveCreateTodoModal = () => {

        console.log(content, "content");
        todoProxy.createTodo(assignedTo, contentRef.current.value, dueDate, content.id, content.todos ? content.todos.length : 1)
            .then(res => {
                console.log(res, "başarılı create");
                setCategory((category) => {
                    console.log(category, "category");
                    console.log(category.map((el) => {
                        if (el.id === content.id) {
                            return el.todos ? [...el.todos, res.data.data] : [res.data.data]
                        }
                        return el
                    }))
                    return category.map((el) => {
                        if (el.id === content.id) {
                            console.log(el, "el");
                            return { ...el, todos: el.todos ? [...el.todos, res.data.data] : [res.data.data] }
                        }
                        return el
                    })

                })
                setTodosOrder((todosOrder) => {
                    console.log(todosOrder.map((el, i) => {
                        if (i === index) {
                            return [...el, res.data.data.id]
                        }
                        return el
                    }));
                    return todosOrder.map((el, i) => {
                        if (i === index) {
                            return [...el, res.data.data.id]
                        }
                        return el
                    })

                })


                setShowCreateTodoModal(false)
            })
            .catch(err => {
                console.log(err);
                setShowCreateTodoModal(false)
            })



    }

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
                                onChange={(e) => { setDueDate(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Please type content here..." ref={contentRef} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select onChange={(e) => { setAssignedTo(e.target.value) }}>
                                <option>Choose</option>
                                {users?.map((user) => (
                                    <option key={user.id} value={user.email}>{user.email}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreateTodoModal}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSaveCreateTodoModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



            <Draggable draggableId={`cat-${content.id}`} index={index}>
                {(provided) => (

                    <Card
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}

                        style={{ "height": "min-content", "width": "18rem", "display": "inline-flex" }}
                        className="shadow-sm m-3"
                    >
                        <Card.Header >{content.category_name}
                            <i style={{ "float": "right" }} className="bi bi-chevron-left"></i>
                        </Card.Header>
                        <Card.Body>
                            <Droppable droppableId={`category-${content.id ? content.id : 0}`} type="todo">
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
                            <Button onClick={handleShowCreateTodoModal} variant="primary" size='sm' style={{}}>
                                New Todo
                                <span className='m-2'><i className="bi bi-plus-square"></i></span>
                            </Button>
                        </Card.Footer>
                    </Card>


                )}

            </Draggable>

        </>
    )
}

export default Category