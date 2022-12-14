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
import AppliAdmin from './pages/admin/AppliAd';
import Schools from './pages/admin/schools/Schools';
import EditShool from './pages/admin/schools/EditSchool';
import NewSchool from './pages/admin/schools/NewSchool';
import Appli from './pages/Applis';
import StudentRegister from './pages/logged/Register';



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
              {user.loggedIn && user.role == '0' && (
                    <>
                        <Route path="/admin/applications" element={<AppliAdmin />} /> 
                        <Route path="/admin/schools" element={<Schools />} /> 
                        <Route path="/admin/schools/new" element={<NewSchool />} /> 
                        <Route path="/admin/schools/edit/:id" element={<EditShool />} /> 
                    </>
                )}
                {user.loggedIn && (
                    <>
                        <Route path="/applications" element={<Appli/>} /> 
                        <Route path="/student/register" element={<StudentRegister/>} /> 
                    </>
                )}

              <Route path="/logout" element={<Logout logoutUser={logoutUser} />} /> 
              {/* <Route path="*" element={<p>Path not resolved</p>} /> */}

          </Routes>
      </BrowserRouter>
  )
}

export default App