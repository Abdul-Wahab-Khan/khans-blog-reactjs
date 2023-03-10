import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectpostById, useGetpostsQuery } from './postsApiSlice'
 
export default function ShowPosts(){
    const {
        data: posts, isError, error, isSuccess, isLoading
    } = useGetpostsQuery('posts', {
        pollingInterval: 600000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content
    if (isLoading) content = <p>Loading ...</p>
    if (isError) { content = <p className="text-danger">{error?.data?.message}</p> }

    if (isSuccess) {
        const { ids } = posts
        const allPosts = ids.length && ids.map(id => <PostAuthLess key={id} postId={id} />)
        content =  <div className="col-12 row justify-content-center">
                        { allPosts }
                    </div>
               
    }

    return content
}

function PostAuthLess({ postId }) {
    const post = useSelector(state => selectpostById(state, postId))
    if (post) {
        if (post.approved) {
            return (
                <div className="card col-5 mx-5 my-5">
                    <div className="card-header">
                        <Image style={{width: '450px'}}
                            src={post?.imageUrl ? post?.imageUrl : ''} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body.substring(0, 80)}</p>
                        <div className="d-flex align-items-center">
                            <Link to={
                                    { pathname:`/read/${post.id}`}} 
                                    className="btn btn-secondary mx-2">
                                Read more
                            </Link>
                        </div>
                    </div>
                </div>
            )
        } 
    }

    else return null
}