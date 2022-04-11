import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRouter from './routers/PrivateRouter';

function getToken() {
  const token = localStorage.getItem("token");
  const userToken = JSON.parse(token);
  return userToken;

}

function App() {

  const [userToken, setUserToken] = useState(getToken());



  return (


    <Router>
      <Routes>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        <Route path="/" element={<PrivateRouter token={userToken} />} >
          <Route index element={<Homepage token={userToken} />} />
        </Route>

      </Routes>
    </Router>




  );
}

export default App;
