import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header/Header'
import Message from '../components/message/Message'
import axios from 'axios'

const Applis = () => {
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
        axios.get('/api/applications/', {
            "Accept": 'application/json',
            headers: { Authorization: `Bearer ${token}`,
        
        }
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

    const handleDelete = (id) => {
        setLoading(true)
        axios.delete('/api/applicationsS/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setMessage({text: resp.data.message, status: 'success'})
            setTimeout(() => setMessage(''), 2000)

            setReload(true)
            setApplis([])
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
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="pt-5 container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <h2>Pateiktos paraiškos</h2> 
                    </div>
                </div>  
                <Message value={message} />
                {applis.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Asmens kodas</th>
                                <th>Mokymo įstaiga</th>
                                <th>Klasė</th>
                                <th>Miestas</th>
                                <th>Statusas</th>
                                <th>Veiksmai</th>
                            </tr>
                        </thead>
                        <tbody>
                        {applis.map(appli => (
                            <tr key={appli.id}>
                                <td>{appli.created_at}</td>
                                <td>{appli.name}</td>
                                <td>{appli.surname}</td>
                                <td>{appli.student_code}</td>
                                <td>{appli.school_name}</td>
                                <td>{appli.class}</td>
                                <td>{appli.city}</td>
                                <td>{appli.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                                <td>
                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(appli.id)}>Trinti</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Nėra pateiktų paraiškų</h5> }
            </div>
        </>
    )
}

export default Applis