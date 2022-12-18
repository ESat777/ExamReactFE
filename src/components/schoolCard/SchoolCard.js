import './SchoolCard.css'
import { useState, useEffect } from 'react'



const SchoolCard = (props) => {
    const { data, handleOrder } = props
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
        <div className="col hotelBox">
            <h3>{data.name}</h3>
            {data.image && (
                <div className="photo">
                    <img src={data.image} alt={data.name} className="img-fluid" />
                </div>
            )}
            <div className="mt-3">Mokyklos kodas: {data.code}</div>
            <div className="city">Miestas: {data.city}</div>
            <div className="address">Adresas: {data.address}</div>
            {user.loggedIn && user.role === '1' && (
                <>
            <div className="mt-2">
                <button className="btn btn-success" onClick={() => handleOrder(data.id)}>Registruotis</button>
                {/* <li><Link className='h5 text-info' to="/student/register" id={data.id}>Mokyklos</Link></li> */}
            </div>
            </>
            )}
        </div>
    )
}

export default SchoolCard