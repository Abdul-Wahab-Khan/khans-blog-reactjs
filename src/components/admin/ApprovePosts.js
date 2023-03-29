import { Link, useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  selectpostById,
  useApprovePostMutation,
  useDisApprovePostMutation,
  useGetpostsQuery,
} from "../../features/posts/postsApiSlice";
import createMarkup from "../../helpers/getHtmlContent";

function ApprovePosts() {
  const {
    data: posts,
    isError,
    error,
    isSuccess,
    isLoading,
  } = useGetpostsQuery("posts", {
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [approvePost] = useApprovePostMutation();
  const [disApprovePost] = useDisApprovePostMutation();

  const approveThePost = async (id) => {
    const data = await approvePost({ id });
    console.log(data.data.message);
  };

  const disapproveThePost = async (id) => {
    const data = await disApprovePost({ id });
    console.log(data.data.message);
  };

  let content;
  if (isLoading) content = <p>Loading ...</p>;
  if (isError) {
    content = <p className="text-danger">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = posts;
    const allPosts = ids.length
      ? ids.map((id) => (
          <Post
            key={id}
            postId={id}
            approveThePost={approveThePost}
            disapproveThePost={disapproveThePost}
          />
        ))
      : "No posts yet";

    content = (
      <>
        <div className="row col-12 justify-content-center">{allPosts}</div>
      </>
    );
  }

  return content;
}

function Post({ postId, approveThePost, disapproveThePost }) {
  const navigate = useNavigate();
  const handleEdit = () => navigate(`/dashboard/posts/${postId}`);
  const post = useSelector((state) => selectpostById(state, postId));
  if (post) {
    return (
      <MDBCard className="col-5 mx-5 my-5">
        <MDBCardImage src={post.imageUrl} position="top" alt="..." />
        <MDBCardBody>
          <MDBCardTitle>{post.title}</MDBCardTitle>
          <MDBCardText>
            <div
              dangerouslySetInnerHTML={createMarkup(
                post.body.substring(0, 100)
              )}
            ></div>
            {/* {post.body.substring(0, 100)} */}
          </MDBCardText>
          <i>2 days ago</i>
        </MDBCardBody>
        <MDBCardFooter className="text-muted">
          <div className="d-flex justify-content-center">
            <Link
              to={{ pathname: `/read/${post.id}` }}
              className="btn btn-secondary mx-3"
            >
              Read more
            </Link>
            {!post?.approved && (
              <MDBBtn onClick={(e) => approveThePost(post.id)}>Approve</MDBBtn>
            )}
            {post?.approved && (
              <MDBBtn onClick={(e) => disapproveThePost(post.id)}>
                DisApprove
              </MDBBtn>
            )}
          </div>
        </MDBCardFooter>
      </MDBCard>
    );
  } else return <p>Post not add</p>;
}

export default ApprovePosts;
