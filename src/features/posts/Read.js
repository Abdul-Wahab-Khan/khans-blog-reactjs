import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardFooter,
    MDBBtn,
    MDBCardHeader
  } from 'mdb-react-ui-kit';
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import Liker from '../../components/Like';
import useAuth from "../../hooks/useAuth";
import { selectpostById, useIsLikedByCurrentUserMutation } from "./postsApiSlice";
import moment from 'moment'

export function Read() {
    const { id } = useParams()
    const content = id ? <ReadPost postId={id} /> : <p>Loading ...</p>

    return content
}

function ReadPost({postId}) {
    const post = useSelector(state => selectpostById(state, postId))
    const navigate = useNavigate()
    const { isSignedIn } = useAuth()

    if (post) {
        const fromNow = moment(post.createdAt).fromNow()
        return (
            <>
            <MDBBtn onClick={e => navigate(-1)} color="tertiary">Back</MDBBtn>
            <MDBCard className="mx-5 my-5">
                <MDBCardImage src={post.imageUrl} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                    <MDBCardText>
                    {post.body}
                    </MDBCardText>
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>
                    <i>{fromNow}</i>
                </MDBCardFooter>
            </MDBCard>
            </>
        )
    } else return <p>Not found </p>
}