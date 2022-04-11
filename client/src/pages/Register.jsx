import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import UserProxy from '../proxy/UserProxy'

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
                console.log('Başarıyla kayıt oldunuz.');

            })
            .catch(() => {
                setLoading(false);
                console.log('Kayıt sırasında bir hata oluştu.');
            })
    }

    return (
        <>
            <h1>Register</h1>

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
            </h2>
        </>
    )
}

export default Register