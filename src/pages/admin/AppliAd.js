import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Appli = () => {
    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/applications/all', {
            "Accept": 'application/json',
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setReload(false)
            setOrders(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [reload])

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('http://127.0.0.1:8000/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setReload(true)
            setMessage({text: resp.data.message, status: 'success'})
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }

    const handleStatus = (id) => {
        setLoading(true)
        axios.get('http://127.0.0.1:8000/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setReload(true)
            setLoading(false)
            setMessage({text: resp.data.message, status: 'success'})
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }


    return (
        <> 
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2>Gauti užsakymai</h2> 
                    </div>
                </div>  
                <Message value={message} />
                {orders.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Mokykla</th>
                                <th>Kodas</th>
                                <th>Trukme</th>
                                <th>Šalis</th>
                                <th>Statusas</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.school_name}</td>
                                <td>{order.price}</td>
                                <td>{order.travel_duration}</td>
                                <td>{order.country_name}</td>
                                <td>{order.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(order.id)}>Trinti</button>
                                    <button className="btn btn-success" onClick={() => handleStatus(order.id)}>
                                        {order.approved === 0 ? 'Patvirtinti' : 'Atmesti' }
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Nėra gauta jokių užklausų</h5> }
            </div>
        </>
    )
}

export default Appli