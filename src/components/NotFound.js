import { MDBBtn } from "mdb-react-ui-kit"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div className="py-3">
            <MDBBtn onClick={e => navigate(-1)}>Back</MDBBtn>
            <h1>The page not found</h1>
        </div>
    )
}