import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";

export default function User({userId}) {
    const user = useSelector(state => selectUserById(state, userId))
    const navigate = useNavigate()

    const handleEdit = () => navigate(`/auth/update/${userId}`)

    if (user) {
        const userRoles = user.roles.toString().replaceAll(',', ', ')
        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{userRoles}</td>
                <td>
                    <Button onClick={handleEdit}>edit</Button>
                </td>
            </tr>
        )
    } else return null
}