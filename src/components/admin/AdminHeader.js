import {
    MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon,
    MDBCollapse,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
    const [showNav, setShowNav] = useState(false);

    const links = (
        <>
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to="/dashboard/posts">Posts</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink>
                    <Link to="/admin/posts/approve">Approve Posts</Link>
                </MDBNavbarLink>
            </MDBNavbarItem>
        </>
    )

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer fluid>
            <MDBNavbarBrand>Khan's Blog</MDBNavbarBrand>
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