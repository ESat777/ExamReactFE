import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/header/Header'
import Message from '../../components/message/Message'
import Footer from '../../components/footer/Footer'


const Register = () => {
    const id = localStorage.getItem('id')

    
    const [registerForm, setRegisterForm] = useState({
        name: '',
        surname: '',
        student_id: '',
        student_bd: '',
        class: '',
        school_id: id
    })
    const [message, setMessage] = useState({
        text: '',
        status: ''
    })
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleFormChange = (e) => {
        setRegisterForm({...registerForm, [e.target.name]: e.target.value})
    }
    const date = registerForm.student_id
    let year = date.substring(1, 3)
    let month = date.substring(3, 5)
    let day = date.substring(5, 7)
    if(date.substring(0, 1) === '3'){
        registerForm.student_bd = '19' + year + '-' + month +'-' + day
    }else if(date.substring(0, 1) === '4'){
        registerForm.student_bd = '19' + year + '-' + month +'-' + day}
    else if(date.substring(0, 1) === '5'){
        registerForm.student_bd = '20' + year + '-' + month +'-' + day}
        else if(date.substring(0, 1) === '6'){
            registerForm.student_bd = '20' + year + '-' + month +'-' + day}
            else{registerForm.student_bd = '0000'}
    console.log(date.substring(0, 0))

    const handleFormSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        axios.post('/api/student/register', registerForm, {
        headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
        },
        school_id: id
        
        })
        .then(resp => {
            if (resp.status === 200) {
                setLoading(false)
                setMessage({text: 'Mokinio duomenys sėkmingai išsaugoti.', status: 'success'})
                setTimeout(() => navigate('/'), 2000)
            }
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
            {/* {loading && ( <div className="loading">Kraunasi...</div> )} */}
            <Header />
            <main className="text-center registerForm">
                <div className="form-signin w-100 m-auto">
                    <h1 className="h2 mb-3 fw-normal text-light">Mokinio registracija</h1>
                    <Message value={message} />
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="name" onChange={handleFormChange} placeholder="Mokinio vardas" value={registerForm.name} />
                            <label >Vardas</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="surname" onChange={handleFormChange} placeholder="Mokinio pavardė" value={registerForm.surname} />
                            <label >Pavardė</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="student_id" onChange={handleFormChange} placeholder="Asmens kodas" value={registerForm.email} />
                            <label>Asmens kodas</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" name="student_bd" onChange={handleFormChange} placeholder="Gimimo data" value={registerForm.student_bd} />
                            <label>Gimimo data</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="number" className="form-control" name="class" onChange={handleFormChange} placeholder="Klasė" value={registerForm.password} />
                            <label>Kurioje klasėje mokinsis mokinys?</label>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary" type="submit">Registruotis</button>
                    </form> 
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Register