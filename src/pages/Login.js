import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'
import Message from '../components/message/Message'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer/Footer'

const Login = ({setUser}) => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(false)
        const token = localStorage.getItem('token')

        if(token) {
            navigate('/')
        }
    }, [navigate])

    const handleFormChange = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('/api/login', loginForm)
        .then(resp => {
            setLoading(false)
            if(resp.status === 200) {
                localStorage.setItem('token', resp.data.message.token)
                localStorage.setItem('user_role', resp.data.message.role)
                localStorage.setItem('user_name', resp.data.message.user_name)
                console.log(resp.data.message)
                setUser({
                    loggedIn: true,
                    token: resp.data.message.token,
                    role: resp.data.message.role,
                    name: resp.data.message.user_name
                })
                navigate('/')
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }
 
    return (
        <>
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <Header />
            <div className='container'>
            <main className="text-center loginForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h2 mb-3 fw-normal text-light">Prisijungti</h1>
                    <Message value={message} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name="email" onChange={handleFormChange} placeholder="name@example.com" />
                            <label>El. pašto adresas</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control mt-3" name="password" onChange={handleFormChange} placeholder="Slaptažodis" />
                            <label>Slaptažodis</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Prisijungti</button>
                    </form> 
                </div>
            </main>
            <Footer/>
            </div>
        </>
    )
}

export default Login