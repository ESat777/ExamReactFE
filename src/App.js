import './App.css';
import { useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

const App = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('user_role')

      if(token && role) {
          setUser({
              loggedIn: true,
              token,
              role
          })
      }
  }, [])

  const logoutUser = () => {
      setUser({
          loggedIn: false
      })
  }

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              {!user.loggedIn && <Route path="/login" element={<Login setUser={setUser}/>} /> }
              {!user.loggedIn && <Route path="/register" element={<Register />} /> } 
              <Route path="/logout" element={<Logout logoutUser={logoutUser} />} /> 
              {/* <Route path="*" element={<p>Path not resolved</p>} /> */}

          </Routes>
      </BrowserRouter>
  )
}

export default App