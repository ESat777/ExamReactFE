import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'


const Header = () => {
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

    return (
        <header className='bg-white'>
            <div className="container d-flex">
                <div className="h1 text-info">REGISTRAS</div>
                <nav>
                    <ul >
                        <li ><Link className='text-info h4 text-center' to="/">Pradžia</Link></li>
                        {!user.loggedIn && (
                            <>
                                <li><Link className='text-info h4' to="/login">Prisijungti</Link></li>
                                <li><Link className='text-info h4' to="/register">Registruotis</Link></li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link className='text-info h4' to="/orders">Registracijos</Link></li>
                                <li><Link className='text-info h4' to="/logout">Atsijungti</Link></li>
                            </>
                        )}
                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link className='text-info h4' to="/admin/orders">Administratorius</Link>
                                    <ul class="dropdown-menu">
                                        <li><Link className='h5 text-info' to="/admin/orders">Prašymai</Link></li>
                                        <li><Link className='h5 text-info' to="/admin/hotels">Mokyklos</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header