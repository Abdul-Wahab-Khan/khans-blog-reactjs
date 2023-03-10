import { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"

export default function EditUserForm({user}) {
    const [updateUser, {
        isError,
        error,
        isLoading, 
        isSuccess
    }] = useUpdateUserMutation()

    const navigate = useNavigate()
    const [email, setEmail] = useState(user.email)
    const [username, setUsername] = useState(user.username)
    const [myErrors, setMyErrors] = useState()

    useEffect(() => {
        if(isSuccess) {
            setUsername('')
            setEmail('')
            navigate('/auth/userslist')
        }
        
    }, [isSuccess, navigate])

    const canSubmit = [email.length, username.length].every(Boolean) && !isLoading
    
    const editUser = async (e) => {
        e.preventDefault()
        if (canSubmit) {
            await updateUser({ id: user.id, username, email })
        } else {
            setMyErrors('Please fill all the inputs')
        }
    }

    let errorContent
    if (isError) {
        errorContent = <>
            <p className="text-danger">{error.data.message}</p>
            <p className="text-danger">{myErrors}</p>
            </>
        console.log(error)
    }

    return (
        <>
        <h2>Register</h2>
        {errorContent}
        <Form onSubmit={editUser}>
            <Form.Group controlId="username">
            <Form.Label>username</Form.Label>
            <Form.Control value={username}  onChange={e => setUsername(e.target.value)}
                type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email}  onChange={e => setEmail(e.target.value)}
                type="email" placeholder="Enter email" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>

            {/* <p>{this.state.errors}</p> */}
        </Form>
    </>
    )
}