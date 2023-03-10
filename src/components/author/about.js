import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardFooter,
    MDBBtn,
    MDBCardHeader,
} from 'mdb-react-ui-kit'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAuthorQuery } from './authorApiSlice'

export default function AboutAuthor() {

    const {data, isSuccess, isError, isLoading, error
    } = useGetAuthorQuery()

    const navigate = useNavigate()

    let content
    if (isLoading) content = <p>Loading ...</p>
    if (isError) { content = <p className="text-danger">{error?.data?.message}</p> }
    
    if (isSuccess) {
        const author = Object.entries(data.entities)[0][1]
        content = (
            <>
                <MDBBtn onClick={e => navigate(-1)} color="tertiary">Back</MDBBtn>
                <MDBCard className="mx-5 my-5">
                    <MDBCardHeader>
                        <h1>{author.fullname}</h1>
                    </MDBCardHeader>
                    <MDBCardImage style={{width: '300px', alignSelf: 'center'}} src={author.imageUrl} position='top' alt={`Khan's pic`} />
                    <MDBCardBody>
                        <MDBCardTitle>About {author.fullname}</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                {author.about}
                            </div>
                            <hr />
                            <div>
                                <h5>Contact Info</h5>
                            </div>
                            <div className='row col-12'>
                                <div className='col-3'>
                                </div>  
                                <div className='col-3'>
                                    <h5>Emails:</h5> {author.emails.map(email => {
                                        return <p>{email.email}</p>
                                    })}
                                </div>
                                <div className='col-3'>
                                    <h5>Numbers:</h5> {author.numbers.map(number => {
                                        return <p>{number.number}</p>
                                    })}
                                </div>
                                <div className='col-3'>
                                </div>
                            </div>
                        </MDBCardText>
                    </MDBCardBody>
                    <MDBCardFooter className='text-muted'>
                        <i>Year of Experience {new Date().getFullYear() - 2020}</i>
                    </MDBCardFooter>
                </MDBCard>
            </>
        )
    }

    return content
}