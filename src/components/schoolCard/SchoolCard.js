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
            <div className="mt-3 fs-5 price"><strong>Mokyklos kodas: {data.code}</strong></div>
            <div className="city">Miestas: {data.city}</div>
            <div className="address">Adresas: {data.address}</div>
            <div className="address">Adresas: {data.id}</div>
            {user.loggedIn && user.role === '1' && (
                <>
            <div className="mt-2">
                <button className="btn btn-success" onClick={() => handleOrder(data.id)}>Mokyklos</button>
                {/* <li><Link className='h5 text-info' to="/student/register" id={data.id}>Mokyklos</Link></li> */}
            </div>
            </>
            )}
        </div>
    )
}

export default SchoolCard