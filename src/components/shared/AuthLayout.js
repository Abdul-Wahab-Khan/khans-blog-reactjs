import { Link, Outlet } from "react-router-dom";
import AuthHeader from './AuthHeader'
import Footer from "./Footer";

export default function AuthLayout({user}){
    return (
        <>
            <AuthHeader />
            <Outlet />
            <Footer />
        </>
    )
}