import { useState } from 'react'
import SchoolCard from '../schoolCard/SchoolCard'
import Message from '../message/Message'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


import './SchoolList.css'

const SchoolList = (props) => {
    const schools = props.schools
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // const [message, setMessage] = useState({
    //     text: '',
    //     status: ''
    // })

    const handleOrder = (id) => {
        setLoading(true)
        localStorage.setItem('id', id)
        navigate('/student/register')

        // axios.post('/api/applications', {
        //     school_id: id
        // }, 
        // {
        //     headers: { Authorization: `Bearer ${token}` }
        // })
        // .then(resp => {
        //     if (resp.status === 200) {
        //         setLoading(false)
        //         setMessage({text: 'Sėkmingai užsiregistravote.', status: 'success'})
        //     }
        // })
    //     .catch(err => {
    //         setLoading(false)
    //         if(err.response.data)
    //             setMessage({text: err.response.data.message, status: 'danger'})
    //         else 
    //             setMessage({text: 'Serveris miręs', status: 'danger'})
    //     })
    }

    return loading ? ( <div className="loading">Kraunasi...</div> ) : (
        <>
            {/* <Message value={message} /> */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {schools.map(school => <SchoolCard key={school.id} data={school} handleOrder={handleOrder} />)}
            </div>
        </>
    )
}

export default SchoolList