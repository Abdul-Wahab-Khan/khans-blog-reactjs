import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

export default function RequiredAuth ({ allowedRoles }) {
    const location = useLocation()
    const { roles } = useAuth()

    const content = roles.some(role => allowedRoles.includes(role))
                ? <Outlet /> : <Navigate to='/auth/unauthorized' state={{from: location}} replace />

    return content
}