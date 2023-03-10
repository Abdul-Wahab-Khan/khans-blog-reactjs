import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogOutUserMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse,
    MDBBtn,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';

function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    
    const [logOutUser, {
        isLoading, 
        isSuccess,
        isError,
        error
    }] = useLogOutUserMutation()

    const { username, isAdmin } = useAuth()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    if (isLoading) <p>Working on it...</p>
    if (isError) <p>{error.data?.message}</p>

    let links

    if (!username) {
        links = (
        <>
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to="/auth/login">Login</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to="/auth/register">Register</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
        </>
        )
    } else {
        links = (
        <>
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to='/dashboard'>Dashboard</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
            {isAdmin && 
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to='/admin'>Admin Dash</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>}
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link onClick={e => logOutUser()}>Logout</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
        </>
        )
    }
    const [showNav, setShowNav] = useState(false);
    return (
        <header>
        <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
            <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNav(!showNav)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav>
                {location.pathname !== '/' &&
                <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
                }
                {links}
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>

        {location.pathname === '/' && 
        <div
            className='p-5 text-center bg-image'
            style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
        >
            <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-white'>
                {username && <h1 className='mb-3'>Welcome {username}</h1>}
                {!username && <h1 className='mb-3'>Hello there</h1>}
                <h4 className='mb-3'>You are at the right place to read articles</h4>
                {!username && 
                <MDBBtn onClick={e => navigate('/auth/register')} outline size="lg">
                    Wanna sign up?
                </MDBBtn>
                }
                </div>
            </div>
            </div>
        </div>}
        </header>
    );
}

export default Header