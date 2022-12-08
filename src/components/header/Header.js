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
                        {user.loggedIn && user.role === '1' && (
                            <>
                                <li><Link className='text-info h4' to="/applications">Registracijos</Link></li>
                            </>
                        )}

                        {user.loggedIn && user.role === '0' && (
                            <>
                                <li>
                                    <Link className='text-info h4' to="/admin/applications">Administratorius</Link>
                                    <ul class="dropdown-menu">
                                        <li><Link className='h5 text-info' to="/admin/applications">Prašymai</Link></li>
                                        <li><Link className='h5 text-info' to="/admin/schools">Mokyklos</Link></li>
                                    </ul>
                                </li>
                            </>
                        )}
                        {user.loggedIn && (
                            <>
                                <li><Link className='text-info h4' to="/logout">Atsijungti</Link></li>
                            </>
                        )}

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header