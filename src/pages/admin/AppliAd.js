import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Appli = () => {
    const [applis, setApplis] = useState([])
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
        axios.get('/api/applications/all', {
            "Accept": 'application/json',
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setReload(false)
            setApplis(resp.data.message)

        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }, [reload])

    const handleDetails = (id) => {
            setLoading(true)
            navigate('/admin/applis/register/' + id )
    }

    return (
        <> 
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2 className='text-white'>Gauti prašymai</h2> 
                    </div>
                </div>  
                <Message value={message} />
                {applis.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Laikas</th>
                                <th>Mokymo įstaiga</th>
                                <th>Mokinio pavarė</th>
                                <th>Gimimo data</th>
                                <th>Adresas</th>
                                <th>Miestas</th>
                                <th>Statusas</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                        {applis.map((appli, index )=> (
                            <tr key={index}>
                               <td>{appli.created_at.substring(0, 10)}</td>
                                <td>{appli.created_at.substring(11, 16)}</td>
                                <td>{appli.school_name}</td>
                                <td>{appli.surname}</td>
                                <td>{appli.student_bd}</td>
                                <td>{appli.address}</td>
                                <td>{appli.city}</td>
                                <td>{appli.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                                <td>
                                    <button className="btn btn-warning me-2 " onClick={() => handleDetails(appli.id)}>Detaliau</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Nėra gauta jokių prašymų</h5> }
            </div>
        </>
    )
}

export default Appli