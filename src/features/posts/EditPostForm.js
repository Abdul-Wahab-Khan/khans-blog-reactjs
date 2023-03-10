import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useDeletepostMutation, useUpdatepostMutation } from "./postsApiSlice"

function EditPostForm({post}){
    const [
        updatePost, { isSuccess, isLoading, isError, error }
    ] = useUpdatepostMutation()

    const [
        deletePost, { isSuccess: isDelSuccess, isLoading: isDelLoading, 
            isError: isDelError, error: delError }
    ] = useDeletepostMutation()

    const { username } = useAuth()
    const [title, setTitle] = useState(post.title)
    const [body, setBody] = useState(post.body) 
    const [myErrors, setMyErrors] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setBody('')
            setTitle('')
            setMyErrors('')
            navigate('/dashboard/posts')
        }
        
        if (isDelSuccess) {
            setBody('')
            setTitle('')
            setMyErrors('')
            navigate('/dashboard/posts')
        }
    }, [isSuccess, isDelSuccess, navigate])

    const canSubmit = [title.length, body.length].every(Boolean) && !isLoading

    const editPost = async (e) => {
        e.preventDefault()
        if (canSubmit) {
            await updatePost({id: post.id, title, body})
        } else {
            setMyErrors('Please fill all the inputs')
        }
    }

    const deleteUserPost = async (e) => {
        e.preventDefault()
        await deletePost({id: post.id})
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
            <h4>{username} is editing the post on {new Date().toLocaleString()}</h4>
            {errorContent}
            {delError && <p className="text-danger">{delError.data.message}</p>}
            <Form onSubmit={editPost}>
                <div>
                    <input type="text" className="form-control my-4"
                        name="title" onChange={e => setTitle(e.target.value)}
                    defaultValue={title} placeholder="Title..." />
                </div>
                <div>
                    <textarea name="title" placeholder="Content" className="form-control my-4"
                        onChange={e => setBody(e.target.value) } defaultValue={body} >
                    </textarea>
                </div>
                <input type="submit" className="btn btn-secondary my-2" value="Update" />
            </Form>
            <Button className="btn btn-danger" onClick={deleteUserPost}>Delete</Button>
        </>
    )

}

export default EditPostForm