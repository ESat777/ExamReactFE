import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import axios from 'axios'

const Appli = () => {
    const { id } = useParams();
    const [applis, setApplis] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    var today = new Date()


    useEffect(() => {
        setLoading(true)
        axios.get('/api/applicationsS/' + id 
        , {
            "Accept": 'application/json',
            headers: { Authorization: `Bearer ${token}` }
        }
        )
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
        axios.delete('/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setMessage({text: resp.data.message, status: 'success'})
            setTimeout(() => navigate('/admin/applications'), 2000)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }
    const back = () => {
            setLoading(true)
            navigate('/admin/applications')
    }


    const handleStatus = (id) => {
        setLoading(true)
        axios.get('/api/applications/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setReload(true)
            setLoading(false)
            setMessage({text: resp.data.message, status: 'success'})
            setTimeout(() => setMessage(''), 2000)
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
                        <h2 className='text-white'>Prašymas</h2>
                        {applis.map((appli, index )=> (
                            <tr key={index}>
                                <td>
                                    <button className="btn btn-danger m-2" onClick={() => handleDelete(appli.id)}>Trinti</button>
                                    <button className="btn btn-success" onClick={() => handleStatus(appli.id)}>
                                        {appli.approved === 0 ? 'Patvirtinti' : 'Atmesti' }
                                    </button>
                                    <button className="btn btn-dark m-2" onClick={() => back()}>Atgal</button>
                                </td>
                            </tr>
                        ))}
                    </div>
                </div> 
                <div><h5 className='text-white'>Mokinio informacija</h5> </div> 
                
                
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Vardas</th>
                                <th>Pavardė</th>
                                <th>Gimimo data</th>
                                <th>Asmens kodas</th>
                                <th>Amžius</th>
                                <th>Klasė kurioje mokinsis</th>
                                <th>Registruojantis asmuo</th>
                                <th>Registracijos data</th>
                                <th>Registracijos laikas</th>
                            </tr>
                        </thead>
                        <tbody>
                        {applis.map((appli, index )=> (
                            <tr key={index}>
                                <td>{appli.name}</td>
                                <td>{appli.surname}</td>
                                <td>{appli.student_bd}</td>
                                <td>{appli.student_id}</td>
                                <td>{appli.student_bd != null ? today.getFullYear() - appli.student_bd.substring(0, 4) : 'Klaida' }</td>
                                <td>{appli.class}</td>
                                <td>{appli.user_name}</td>
                                <td>{appli.created_at.substring(0, 10)}</td>
                                <td>{appli.created_at.substring(11, 16)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div><h5 className='text-white'>Mokymo įstaigos informacija</h5> </div> 
                    <p id="demo"></p>
                
                
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>Pavadinimas</th>
                                <th>Adresas</th>
                                <th>Įstaigos kodas</th>
                                <th>Miestas</th>
                                <th>Prašymo statusas</th>
                            </tr>
                        </thead>
                        <tbody>
                        {applis.map((appli, index )=> (
                            <tr key={index}>
                                <td>{appli.school_name}</td>
                                <td>{appli.school_address}</td>
                                <td>{appli.school_code}</td>
                                <td>{appli.city}</td>
                                <td>{appli.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                
                <Message value={message} />
            </div>
            

        </>
    )
}

export default Appli