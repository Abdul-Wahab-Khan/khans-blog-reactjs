import { Link, useNavigate } from "react-router-dom";
import { selectpostById, useGetUserPostsQuery } from './postsApiSlice'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter
} from 'mdb-react-ui-kit';
import { useSelector } from "react-redux";

function Posts() {

    const {
        data: posts, isError, error, isSuccess, isLoading
    } = useGetUserPostsQuery('posts', {
        pollingInterval: 600000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    if (isLoading) content = <p>Loading ...</p>
    if (isError) { content = <p className="text-danger">{error?.data?.message}</p> }

    if (isSuccess) {
        const { ids } = posts
        const allPosts = ids.length
            ? ids.map(id => <Post key={id} postId={id} />) 
            : 'No posts yet'

        content = <>
                    <div className="row col-12 justify-content-center">
                        { allPosts }
                    </div>
                </>
    }

    return content
}

function Post({postId}) {
    const navigate = useNavigate()
    const handleEdit = () => navigate(`/dashboard/posts/${postId}`)
    const post = useSelector(state => selectpostById(state, postId))
    if (post) {
        return (
            <MDBCard className="col-5 mx-5 my-5">
                <MDBCardImage src={post.imageUrl} position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                    <MDBCardText>
                    {post.body.substring(0, 100)}
                    </MDBCardText>
                    <i>2 days ago</i>
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>
                    <div className="d-flex justify-content-center">
                        <Link to={
                                { pathname:`/read/${post.id}`}} 
                                className="btn btn-secondary">
                            Read more
                        </Link>
                        <Link to={
                                { pathname:`/dashboard/posts/${post.id}`}} 
                                className="btn btn-warning mx-2">
                            Edit
                        </Link>
                    </div>
                </MDBCardFooter>
            </MDBCard>
        )
    } else return <p>Post not add</p>
}

export default Posts