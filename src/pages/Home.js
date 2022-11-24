import Header from '../components/header/Header'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Footer from '../components/footer/Footer'

const Home = () => {

    useEffect(() => {
        //const token = localStorage.getItem('token')
        setLoading(true)
        axios.get('/api/schools')
        .then(resp => {
            setLoading(false)
            if(resp.data.success) {
                setHotels(resp.data.message)
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
            <Footer/>
        </>
    )
}

export default Home