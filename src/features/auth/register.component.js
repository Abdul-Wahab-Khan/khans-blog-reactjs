import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAddUserMutation } from "../users/usersApiSlice"; 
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

export default function RegisterController() {
    
    const [addUser, {
        isLoading,
        isError, 
        error,
        isSuccess,
    }] = useAddUserMutation()
 
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [myErrors, setMyErrors] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setEmail('')
            setPassword('')
            navigate('/auth/login')
        }
    }, [isSuccess, navigate])

    const canSubmit = [email.length, username.length, password.length].every(Boolean) && !isLoading

    async function handleRegistration(e) {
        e.preventDefault()
        if (canSubmit) {
            const roles = ['user']
            await addUser({email, username, password, roles})
            setMyErrors('Registering...')
        } else {
            setMyErrors('Please fill up the form or wait for a moment...')
        }
    }

    let errorContent
    if (isError) {
        errorContent = <p>{error.data.message}</p>
        console.log(error)
    }

    return (
        <>
        <h2 className="pt-3">Register</h2>
        <p>{errorContent}</p>
        <p>{myErrors}</p>
        <div className="d-flex justify-content-center align-items-center p-4">
            <Form onSubmit={handleRegistration}>
                <Form.Group className="my-3" controlId="username">
                <MDBInput value={username}  onChange={e => setUsername(e.target.value)}
                    type="text" label="Username" />
                </Form.Group>

                <Form.Group className="my-3" controlId="email">
                <MDBInput value={email}  onChange={e => setEmail(e.target.value)}
                    type="email" label="Email" />
                </Form.Group>

                <Form.Group className="my-3" controlId="password">
                <MDBInput value={password} onChange={e => setPassword(e.target.value)}
                    type="password" label="Password" />
                </Form.Group>

                <MDBBtn className="col-12" type="submit">
                    Register
                </MDBBtn>

                {/* <p>{this.state.errors}</p> */}
            </Form>
        </div>
        </>

    )
} 
