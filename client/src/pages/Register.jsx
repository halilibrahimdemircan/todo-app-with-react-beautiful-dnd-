import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UserProxy from '../proxy/UserProxy'
import { Form, Button, Container, Row, Col } from "react-bootstrap"


const Register = () => {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef();
    const passwordRef = useRef();
    const userProxy = new UserProxy();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        userProxy.saveUser(emailRef.current.value, passwordRef.current.value)
            .then((res) => {
                console.log(res);
                setLoading(false);
                alert("Başarıyla kayıt oldunuz.")
                window.location.href = '/login';

            })
            .catch(() => {
                setLoading(false);
                console.log('Kayıt sırasında bir hata oluştu.');
            })
    }

    return (
        <>
            <Container className='mt-5'>
                <h1 className='m-3 text-center'>REGISTER</h1>
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
                                    Have an account?, please <Link to='/login'>login</Link>
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
            {/* <h1>Register</h1>

            <form onSubmit={handleSubmit}>


                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" ref={emailRef} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" ref={passwordRef} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>

            </form>
            <h2>
                <Link to="/login" >
                    If you already register click here and login
                </Link>
            </h2> */}
        </>
    )
}

export default Register