import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from 'react-bootstrap'
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function LoginController() {
    const userRef = useRef()
    const errorRef = useRef()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrors('')
    }, [email, password])

    if (isLoading) return <p>Loading...</p>

    async function loginUser(e) {
        e.preventDefault()
        if (email === '' || password === '') {
            setErrors('please enter your email and password')
            return
        }

        try {
            const { accessToken } = await login({ email, password }).unwrap()
            console.log(accessToken)
            dispatch(setCredentials({ accessToken }))
            setEmail('')
            setPassword('')
            navigate('/dashboard')    
        } catch(err) {
            if (!err.status) setErrors('No response, please try again')
            else if(err.status === 400) setErrors('Username or password is wrong')
            else if(err.status === 401) setErrors('Unauthorized')
            else setErrors(err.data?.message)

            errorRef.current.focus()
        }
    }

    const content = (
        <>
        <h2 className="pt-3">Login</h2>
        <div className="d-flex justify-content-center align-items-center p-2">
            <Form onSubmit={loginUser} className="mt-20 mb-20">
                <div className="form-group my-3">
                    <label htmlFor="emailInput">
                    <MDBInput label='Email' id='emailInput' type='email' 
                        ref={userRef}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required />
                    </label>
                
                </div>
                <div className="form-group my-3">
                    <label htmlFor="passwordInput">
                    <MDBInput label='Password' id='passwordInput' type='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required />
                    </label>
                </div>
                <div>
                    <MDBBtn type="submit" className="col-12">Submit</MDBBtn>
                    <label htmlFor="persist" className="my-4">
                        <input id="persist" type="checkbox" onChange={e => setPersist(pre => !pre)} checked={persist} />
                        {` Remember me`}
                    </label>
                </div>
                <p ref={errorRef} aria-live="assertive" className="text-danger">{errors}</p>
            </Form>
        </div>
        </>
         )

    return content
} 

export default LoginController