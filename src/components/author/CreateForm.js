import { useAddInfoMutation, useUpdateInfoMutation } from "./authorApiSlice"
import { MDBBtn, MDBInput, MDBTextArea } from "mdb-react-ui-kit"
import { useEffect, useState } from "react"
import { Form } from "react-bootstrap"

export default function CreateAuthorForm({author}) {

    const [numbers, setNumbers] = useState([...author.numbers])
    const [fullname, setFullname] = useState(author.fullname)
    const [about, setAbout] = useState(author.about)
    const [imageUrl, setImageUrl] = useState(author.imageUrl)
    const [emails, setEmails] = useState([...author.emails])
    const [myErrors, setMyErrors] = useState()
    const [edit, setEdit] = useState(false)
    
    const [updateAuthorInfo, {
        isSuccess, isError, error, isLoading
    }] = useUpdateInfoMutation()

    useEffect(() => {
        if (isSuccess) setEdit(false)
    }, [isSuccess])

    const addEmailField = (e) => {
        e.preventDefault()
        let newEmail = {email: ''}
        setEmails([...emails, newEmail])
    }

    const addNumberField = (e) => {
        e.preventDefault()
        let newNumber = {number: ''}
        setNumbers([...numbers, newNumber])
    }

    const canSubmit = [fullname.length, imageUrl.length].every(Boolean) && !isLoading

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSubmit) {
            const id = author.id
            const data = await updateAuthorInfo({ fullname, imageUrl, emails, numbers, about, id })
            console.log(data)
            setMyErrors('Adding the author, please wait...')
        } else {
            setMyErrors('Please fill up the form or wait for a moment...')
        }
    }

    let errorContent
    if (isError) {
        errorContent = 
            <>
                <p className="text-danger">{error.data.message}</p>
            </>
    }

    return (
        <div className="container">
                {errorContent}
                <Form onSubmit={handleSubmit}>
                    <div className="row col-12">
                        <div className="col-6 my-4">
                            <MDBInput type="text" onChange={e => setFullname(e.target.value)}
                            defaultValue={fullname} label="Fullname" disabled={!edit} />
                        </div>
                        <div className="col-6 my-4">
                            <MDBInput type="text" onChange={e => setImageUrl(e.target.value)}
                            defaultValue={imageUrl} label="Image Url" disabled={!edit} />
                        </div>
                    </div>
                    <div disabled={!edit}className="my-4">
                        <MDBTextArea name="about" label="About Author" className="my-4" disabled={!edit}
                            onChange={e => setAbout(e.target.value) } defaultValue={about} >
                        </MDBTextArea>
                    </div>
                    <div className="row col-12">
                        <div className="col-6 my-4">
                            {emails.map((input, index) => {
                                return <MDBInput key={index} type="text" onChange={event => {
                                    const data = [...emails];
                                    data[index].email = event.target.value;
                                    setEmails(data);
                                }} disabled={!edit}
                                className="my-3" defaultValue={input.email} label="Email" />
                            })}
                            <MDBBtn onClick={addEmailField}>Add</MDBBtn>
                        </div>
                        <div className="col-6 my-4">
                            {numbers.map((input, index) => {
                                return <MDBInput key={index} type="text" onChange={event => {
                                    const data = [...numbers];
                                    data[index].number = event.target.value;
                                    setNumbers(data);
                                }} disabled={!edit}
                                className="my-3" defaultValue={input.number} label="Number" />
                            })}
                            <MDBBtn onClick={addNumberField}>Add</MDBBtn>
                        </div>
                    </div>
                    <MDBBtn type="submit" color="secondary" className="my-2">Save Info</MDBBtn>
                    <MDBBtn className="my-2 mx-3" onClick={e => {
                        e.preventDefault()
                        setEdit(p => !p)
                    }}>{edit ? 'Stop Editing': 'Edit'}</MDBBtn>
                </Form>
            </div>
    )
}