import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";

export default function useAuth() {
    const token = useSelector(currentToken)
    let isAdmin = false
    let isSignedIn = false

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles, id } = decoded.user

        isAdmin = roles.includes('admin')
        isSignedIn = true
        return { username, roles, isAdmin, id, isSignedIn }
    }

    return { username: '', roles: [], isAdmin }
}