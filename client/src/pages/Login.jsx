import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserProxy from '../proxy/UserProxy';
import { Form, Button, Container, Row, Col } from "react-bootstrap"

const Login = () => {
    const userProxy = new UserProxy
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(emailRef.current.value, passwordRef.current.value);

        userProxy.login(emailRef.current.value, passwordRef.current.value)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token));
                window.location.href = '/';
            })
            .catch(err => {
                console.log(err);
            })

    }


    return (
        <>


            <Container className='mt-5'>
                <h1 className='m-3 text-center'>LOGIN</h1>
                <Row>
                    <Col md={3} className='mx-auto'></Col>
                    <Col md={6} className='mx-auto'>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" ref={emailRef} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                            </Form.Group>
                            <div className='text-center'>
                                <Form.Text className="text-muted">
                                    If you didn't have an account, please <Link to='/register'>register</Link>
                                </Form.Text><br />
                                <Button className="" variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>

                        </Form>
                    </Col>
                    <Col md={3} className='mx-auto'></Col>



                </Row>

            </Container>




            {/* <h1>Login</h1>
            

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={passwordRef} />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>

            </form>

            <span>
                <Link to="/register" >
                    If you didn't register click here and register
                </Link>
            </span> */}


        </>
    )
}

export default Login