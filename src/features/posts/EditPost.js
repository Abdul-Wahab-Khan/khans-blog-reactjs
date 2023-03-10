import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import EditPostForm from "./EditPostForm"
import { selectpostById } from "./postsApiSlice"

function EditPost(){
    const { id } = useParams()
    const post = useSelector(state => selectpostById(state, id))
    const content = post ? <EditPostForm post={post} /> : <p>Loading ...</p>

    return content
}

export default EditPost