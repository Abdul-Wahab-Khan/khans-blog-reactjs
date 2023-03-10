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
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function AuthHeader() {
    const location = useLocation()
    const [showNav, setShowNav] = useState(false);
    const { username } = useAuth()

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
        links = null
    }

    return (
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
                <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                    <Link to="/">Home</Link>
                </MDBNavbarLink>
                </MDBNavbarItem>
                {links}
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
        </MDBNavbar>
    )
}