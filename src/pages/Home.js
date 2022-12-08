import Header from '../components/header/Header'
import SchoolList from '../components/schoolList/SchoolList'
import Message from '../components/message/Message'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [schools, setSchools] = useState([])
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })

    useEffect(() => {
        setLoading(true)
        axios.get('/api/schools')
        .then(resp => {
            setLoading(false)
            if(resp.data.success) {
                setSchools(resp.data.message)
            }
        })
        .catch(err => {
            setLoading(false)
            if(err.response.data)
                setMessage({text: err.response.data.message, status: 'danger'})
            else 
                setMessage({text: 'Serveris miręs', status: 'danger'})
        })
    }, [])

    return (
        <>
            <Header />
            {loading && ( <div className="loading">Kraunasi...</div> )}
            <div className="container">
                <Message value={message} />
                {schools ? <SchoolList schools={schools} /> : (
                    <h2>Nėra registruotų mokymo įstaigų</h2>
                )}
            </div>
            <Footer/>
        </>
    )
}

export default Home