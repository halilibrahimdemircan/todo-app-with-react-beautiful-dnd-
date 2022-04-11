import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import UserProxy from '../proxy/UserProxy';

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
            <h1>Login</h1>
            {/* <Form.Floating className="mb-3">
    <Form.Control
      id="floatingInputCustom"
      type="email"
      placeholder="name@example.com"
    />
    <label htmlFor="floatingInputCustom">Email address</label>
  </Form.Floating>
  <Form.Floating>
    <Form.Control
      id="floatingPasswordCustom"
      type="password"
      placeholder="Password"
    />
    <label htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating> */}

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

            <h2>
                <Link to="/register" >
                    If you don't register click here and register
                </Link>
            </h2>


        </>
    )
}

export default Login