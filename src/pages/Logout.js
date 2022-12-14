import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = (props) => {
    const { logoutUser } = props
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            axios.post('/api/logout', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                localStorage.removeItem('id')
                localStorage.removeItem('token')
                localStorage.removeItem('user_role')
                localStorage.removeItem('user_name')
                
                logoutUser()
                window.location.href = '/'
                navigate('/')
            })
            .catch(err => {
                console.log(err)
                logoutUser()
                navigate('/')
            })
        }
    }, [])
}

export default Logout;