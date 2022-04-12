
import React, { useState, useRef } from 'react'
import { Card, Button, Modal, Form, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Draggable } from 'react-beautiful-dnd';
import TodoProxy from "../proxy/TodoProxy";




const Item = ({ content, users, index, setCategory, setTodosOrder }) => {
    const todoProxy = new TodoProxy();
    const newContent = useRef()
    const [newDueDate, setNewDueDate] = useState('');
    const [newAssignedTo, setNewAssignedTo] = useState('');

    const [showEditTodoModal, setShowEditTodoModal] = useState(false)
    const [showDeleteTodoModal, setShowDeleteTodoModal] = useState(false)

    const handleShowEditTodoModal = () => setShowEditTodoModal(true)
    const handleCloseEditTodoModal = () => setShowEditTodoModal(false)

    const handleShowDeleteTodoModal = () => setShowDeleteTodoModal(true)
    const handleCloseDeleteTodoModal = () => setShowDeleteTodoModal(false)

    // const handleMarkAsDone = () => {
    //       setCategory((category) => {
    //           category.filter((el) =>{
    //               el.category_name == ("Done" || "done")
    //               return el.id
    //           })
    //       })


    // }

    const handleSaveEditTodoModal = () => {
        console.log(content.id, newContent.current.value, newDueDate, newAssignedTo);

        todoProxy.updateTodo(content.id, newContent.current.value, newDueDate, newAssignedTo)
            .then((res) => {
                console.log("başarılı update", res)
            })
            .catch((err) => {
                console.log("err update", err)
            })


        handleCloseEditTodoModal();


    }

    const handleSaveDeleteTodoModal = () => {



        handleCloseDeleteTodoModal();
        handleCloseEditTodoModal();

    }



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
                                onChange={(e) => { setNewDueDate(e.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={2} placeholder="Please type new content here..." ref={newContent} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select onChange={(e) => { setNewAssignedTo(e.target.value) }} >
                                <option>Choose</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.email}>{user.email}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleShowDeleteTodoModal}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDeleteTodoModal}>
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
                        <div
                            className={
                                "border-start border-3 rounded"
                            }
                        >

                            <Card.Body>
                                <Card.Text>
                                    {content.content}
                                    <OverlayTrigger

                                        placement="top"
                                        overlay={
                                            <Tooltip >
                                                {content.assignedTo}
                                            </Tooltip>
                                        }
                                    >
                                        <Button size='sm' style={{ "float": "right" }} >
                                            <i className="bi bi-person-fill"></i>

                                        </Button>
                                    </OverlayTrigger>
                                </Card.Text>
                                <hr></hr>
                                <Card.Text className='d-flex justify-content-between align-items-center'>

                                    <small className="text-muted">Due Date: {new Date(content.dueDate).toLocaleString('en', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}</small>
                                    <Button onClick={handleShowEditTodoModal} variant="primary" size='sm' >
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
    )
}

export default Item


