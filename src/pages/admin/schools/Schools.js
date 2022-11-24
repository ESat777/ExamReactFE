import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from '../../../components/header/Header'
import Message from '../../../components/message/Message'
import axios from 'axios'

const Schools = () => {
    const [schools, setSchools] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(() => {
        setLoading(true)
        axios.get('/api/schools', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            setLoading(false)
            setReload(false)
            setSchools(resp.data.message)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
            //navigate('/login')
        })
    }, [reload])

    const handleDelete = (id) => {
        console.log(id)
        setLoading(true)
        axios.delete('/api/schools/' + id, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((resp) => {
            setLoading(false)
            setReload(true)
            setMessage({text: resp.data.message, status: 'success'})
            setTimeout(() => setMessage({text: '', status: ''}), 5000)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
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
                    <div className="col-md-12 d-flex">
                        <h2>Mokyklos</h2> 
                        <Link to="/admin/schools/new" className="btn btn-success ml-auto">Nauja Mokykla</Link>
                    </div>
                </div>  
                <Message value={message} />
                {schools.length > 0 ? (
                    <table className="table bg-light table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nuotrauka</th>
                                <th>Pavadinimas</th>
                                <th>Kodas</th>
                                <th>Miestas</th>
                                <th>Adresas</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {schools.map(school => (
                            <tr key={school.id}>
                                <td className="text-center">{school.id}</td>
                                <td className="schoollImage"><img src={school.image} alt={school.name} /></td>
                                <td>{school.name}</td>
                                <td>{school.code}</td>
                                <td>{school.city}</td>
                                <td>{school.address}</td>
                                <td>    
                                    <p className="text-end">
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(school.id)}>Trinti</button>
                                        <Link to={'/admin/schools/edit/' + school.id} className="btn btn-primary">Redaguoti</Link>
                                    </p>
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

export default Schools