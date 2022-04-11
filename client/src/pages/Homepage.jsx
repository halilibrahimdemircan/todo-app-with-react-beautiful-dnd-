import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import TodoProxy from '../proxy/TodoProxy';
import Category from '../components/Category';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const Homepage = () => {
    const todoProxy = new TodoProxy();
    const [category, setCategory] = useState([]);
    const [users, setUsers] = useState([]);
    const [categoryName, setcategoryName] = useState("");
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [categoryOrder, setCategoryOrder] = useState([]);
    const [todosOrder, setTodosOrder] = useState([]);



    const handleShowAddCategoryModal = () => setShowAddCategoryModal(true);
    const handleCloseAddCategoryModal = () => setShowAddCategoryModal(false);

    const handleSaveAddCategoryModal = () => {
        todoProxy.createCategory(categoryName, categoryOrder.length)
            .then(res => {
                setCategory([...category, res.data.data])
                setTodosOrder([...todosOrder, []])
                setShowAddCategoryModal(false)
            })
            .catch(err => {
                console.log(err);
                setShowAddCategoryModal(false)
            })
    }


    const getAllUsers = () => {
        todoProxy.getUsers()
            .then(res => {
                setUsers(res.data.data);
            });
    }

    const [loading, setLoading] = useState(false)
    // getting all categories from db
    const getAllCategories = () => {
        setLoading(true)
        todoProxy.getAllCategories()
            .then(res => {
                setCategory(res.data.data);
                setCategoryOrder(() => {
                    return res.data.data.map((el) => { return el.id })
                })
                setTodosOrder(() => {
                    console.log(res.data.data.map((el) => { return el.todos.map((elm) => { return elm.id }) }));
                    return res.data.data.map((el) => { return el.todos.map((elm) => { return elm.id }) })
                }
                )
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

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
            items.splice(result.destination.index, 0, removedItem);
            setCategory(items);

            const orders = [...categoryOrder];
            const [removedOrder] = orders.splice(result.source.index, 1);
            orders.splice(result.destination.index, 0, removedOrder);
            setCategoryOrder(orders);

            return
        }



        const sourceCategoryIndex = category.findIndex((el) => { return el.id == source.droppableId.split("-")[1] })
        const destinationCategoryIndex = category.findIndex((el) => { return el.id == destination.droppableId.split("-")[1] })


        setCategory((category) => {
            let item = category[sourceCategoryIndex].todos[source.index];
            category[sourceCategoryIndex].todos.splice(source.index, 1);
            category[destinationCategoryIndex].todos.splice(destination.index, 0, item);
            return category
        })
        setTodosOrder((todosOrder) => {
            let item = todosOrder[sourceCategoryIndex][source.index];
            todosOrder[sourceCategoryIndex].splice(source.index, 1);
            todosOrder[destinationCategoryIndex].splice(destination.index, 0, item);
            return todosOrder
        })



    }

    useEffect(() => {
        todoProxy.changeCategoryOrder(categoryOrder)
    }, [categoryOrder])

    useEffect(() => {
        getAllCategories()
        getAllUsers()


    }, [])


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
                            <Form.Control as="textarea" rows={2} placeholder="Please type content here..." value={categoryName} onChange={e => setcategoryName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddCategoryModal}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSaveAddCategoryModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Button
                variant="outline-light"
                onClick={handleShowAddCategoryModal}
                className="m-5"
                style={{}} >New Category</Button>

            <DragDropContext onDragEnd={handleDragEnd} >

                <Droppable direction="horizontal"
                    type="column" droppableId="droppable-main">
                    {(provider) => (

                        <div {...provider.droppableProps} ref={provider.innerRef}>
                            {category?.map((cat, index) => {
                                return (

                                    <Draggable key={cat.id} draggableId={`${cat.id}`} index={index}>
                                        {(provider) => (

                                            <div ref={provider.innerRef} {...provider.draggableProps} {...provider.dragHandleProps} style={{ "display": "inline-block" }} >

                                                <Category content={cat} users={users} index={index} setTodosOrder={setTodosOrder} setCategory={setCategory} />



                                            </div>




                                        )}
                                    </Draggable>

                                )
                            })}

                            {provider.placeholder}
                        </div>
                    )}

                </Droppable>

            </DragDropContext>



        </>

    )
}

export default Homepage