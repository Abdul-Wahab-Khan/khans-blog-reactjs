import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Form } from "react-bootstrap";
import { useAddpostMutation } from './postsApiSlice'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";

function CreatePost(){

    const [addPost, {
        isSuccess, isError, error, isLoading
    }] = useAddpostMutation()

    const { isAdmin, username, id } = useAuth()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('') 
    const [imageUrl, setImageUrl] = useState('') 
    const [myErrors, setMyErrors] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setBody('')
            setMyErrors('')
            navigate('/dashboard/posts')
        }
    }, [isSuccess, navigate])

    const canSubmit = [title.length, body.length].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSubmit) {
            await addPost({title, body, imageUrl})
            setMyErrors('Adding the post, please wait...')
        } else {
            setMyErrors('Please fill up the form or wait for a moment...')
        }
    }

    let errorContent
    if (isError) {
        errorContent = 
            <>
                <p className="text-danger">{error.data.message}</p>
                <p className="text-danger">{myErrors}</p>
            </>
        console.log(error)
    }

    return (
        <div className="container">
            <h4>{username} is creating the post on {new Date().toLocaleString()}</h4>
            {errorContent}
            <Form onSubmit={handleSubmit}>
                <div className="row col-12">
                    <div className="col-6 my-4">
                        <MDBInput type="text" onChange={e => setTitle(e.target.value)}
                        defaultValue={title} label="Title..." />
                    </div>
                    <div className="col-6 my-4">
                        <MDBInput type="text" onChange={e => setImageUrl(e.target.value)}
                        defaultValue={imageUrl} label="Image Url" />
                    </div>
                </div>
                <div className="my-4">
                    <MDBTextArea name="title" label="Content" className="form-control my-4"
                        onChange={e => setBody(e.target.value) } defaultValue={body} >
                    </MDBTextArea>
                </div>
                
                <input type="submit" className="btn btn-secondary my-2" value="Post" />
            </Form>
        </div>
    )
}

export default CreatePost