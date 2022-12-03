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
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('/api/applications/', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setApplis(resp.data.message)
            console.log(resp.data.message)
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [])

    // const handleDelete = (id) => {
    //     setLoading(true)
    //     axios.delete('/api/applications/' + id, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(resp => {
    //         setLoading(false)
    //         setReload(true)
    //         setMessage({text: resp.data.message, status: 'success'})
    //     })
    //     .catch(err => {
    //         setLoading(false)
    //         if(err.response.data)
    //             setMessage({text: err.response.data.message, status: 'danger'})
    //         else 
    //             setMessage({text: 'Serveris miręs', status: 'danger'})
    //         //navigate('/login')
    //     })
    // }

    // const handleStatus = (id) => {
    //     setLoading(true)
    //     axios.get('/api/applications/' + id, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //     .then(resp => {
    //         setReload(true)
    //         setLoading(false)
    //         setMessage({text: resp.data.message, status: 'success'})
    //     })
    //     .catch(err => {
    //         setLoading(false)
    //         if(err.response.data)
    //             setMessage({text: err.response.data.message, status: 'danger'})
    //         else 
    //             setMessage({text: 'Serveris miręs', status: 'danger'})
    //     })
    // }


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
                                <th>Mokymo įstaiga</th>
                                <th>Kodas</th>
                                <th>Adresas</th>
                                <th>Miestas</th>
                                <th>Statusas</th>
                                {/* <th>Veiksmai</th> */}
                            </tr>
                        </thead>
                        <tbody>
                        {applis.map(appli => (
                            <tr key={appli.id}>
                                <td>{appli.school_name}</td>
                                <td>{appli.code}</td>
                                <td>{appli.user}</td>
                                <td>{appli.city}</td>
                                <td>{appli.approved === 0 ? 'Nepatvirtintas' : 'Patvirtintas' }</td>
                                {/* <td>
                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(appli.id)}>Trinti</button>
                                    <button className="btn btn-success" onClick={() => handleStatus(appli.id)}>
                                        {appli.approved === 0 ? 'Patvirtinti' : 'Atmesti' }
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : <h5 className="mt-4">Nėra gauta jokių paraiškų</h5> }
            </div>
        </>
    )
}

export default Applis