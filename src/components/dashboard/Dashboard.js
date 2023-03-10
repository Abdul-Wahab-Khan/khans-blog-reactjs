import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import Footer from '../shared/Footer'

export default function Dashboard(){
    return (
        <>
            <DashHeader />
            <Outlet />
            <Footer />
        </>
    )
}