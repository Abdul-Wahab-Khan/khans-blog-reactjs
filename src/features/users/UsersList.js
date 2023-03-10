import { Table } from "react-bootstrap";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

export default function UsersList() {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading ...</p>
    if (isError) { content = <p className="text-danger">{error?.data?.message}</p> }

    if (isSuccess) {
        const { ids } = users
        const tableContent = ids?.length 
            ? ids.map(userId => <User key={userId} userId={userId} />)
            :null
        
        content = (
            <Table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </Table>
        )
    }

    return content
}