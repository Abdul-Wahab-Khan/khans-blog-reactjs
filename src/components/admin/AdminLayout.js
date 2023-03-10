import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
    return (
        <>
            <AdminHeader />
            <Outlet />
            <Footer />
        </>
    )
}