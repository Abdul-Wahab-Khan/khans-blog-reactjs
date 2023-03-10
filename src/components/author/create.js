import { useGetAuthorQuery } from "./authorApiSlice"
import CreateAuthorForm from "./CreateForm"

export default function CreateAuthor() {

    const {data, isLoading: isALoading, isError: isAError, error: aError, isSuccess: isASuccess
    } = useGetAuthorQuery()

    let content
    if (isALoading) content = <p>Loading ...</p>
    if (isAError) { content = <p className="text-danger">{aError?.data?.message}</p> }

    if (isASuccess) {
        const author = Object.entries(data.entities)[0][1]
        content = <CreateAuthorForm author={author} />
    }

    return content
}